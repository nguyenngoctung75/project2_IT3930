from unidecode import unidecode
import re
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import mysql.connector

# Kết nối đến cơ sở dữ liệu
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="07052004",
    database="story"
)
cursor = conn.cursor()

def slugify(text):
    text = unidecode(text).lower()
    text = re.sub(r'[^a-z0-9 ]', '', text)
    text = re.sub(r'\s+', '-', text)
    text = text.strip('-')
    return text if text else 'default-slug'  # Fallback for empty strings

def crawl_and_store_story(url, start_chapter, end_chapter):
    """
    Crawls a story webpage, extracts data, and stores it in local database mySQL.

    Args:
        url (str): The URL of the story page to crawl.

    Returns:
        dict: The extracted and stored story data.
    """
    try:
        # Send a GET request to the URL
        response = requests.get(url)

        # Check if the request was successful
        if response.status_code != 200:
            print(f"Failed to retrieve the page. Status code: {response.status_code}")
            return None

        # Parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')

        # Extract the title (h3 tag with class 'title')
        try:
            title_tag = soup.find('h3', class_='title')
            title = title_tag.text.strip() if title_tag else "Title not found"
        except Exception as e:
            print(f"Error extracting title: {e}")
            title = "Title extraction failed"


         # Extract the image URL (img tag with itemprop="image")
        try:
            image_tag = soup.find('img', itemprop='image')
            image_url = image_tag['src'] if image_tag and 'src' in image_tag.attrs else "Image URL not found"
        except Exception as e:
            print(f"Error extracting image URL: {e}")
            image_url = "Image URL extraction failed"

        # Extract the author's name (a tag with itemprop="author")
        try:
            author_tag = soup.find('a', itemprop='author')
            author_name = author_tag.text.strip() if author_tag else "Author not found"
        except Exception as e:
            print(f"Error extracting author name: {e}")
            author_name = "Author extraction failed"

        # Extract the description
        try:
            description_div = soup.find('div', itemprop='description')
            description = "Not found"

            if description_div:
                if description_div.find(['p', 'div']):
                    # Get content from <p> and <div>
                    description = "\n".join(tag.get_text(strip=True) for tag in description_div.find_all(['p', 'div']) if tag.get_text(strip=True)).strip()
                else:
                    # If only <br> tags, get the parent content
                    description = description_div.decode_contents()
                    # Replace <br> and <br/> with newlines
                    description = re.sub(r'<br\s*/?>', '\n', description)
                    # Remove <b>, <b/>, <i/> tags but keep content
                    description = re.sub(r'</?(b|i|strong)\s*/?>', '\n', description)
                    # Loại bỏ thẻ <a>
                    description = re.sub(r'</?a[^>]*>', '', description)
                    # Remove excess whitespace
                    description = description.strip()
        except Exception as e:
            print(f"Error extracting description: {e}")
            description = "Description extraction failed"

         # Additional fields
        try:
            created_at = datetime.now()
        except Exception as e:
            print(f"Error setting additional fields: {e}")
            return None

        # Kiểm tra truyện đã tồn tại chưa
        cursor.execute("SELECT id FROM story WHERE storyname = %s AND author = %s", (title, author_name))
        story = cursor.fetchone()
        if story:
            story_id = story[0]
            print(f"Story '{title}' already exists. Only inserting new chapters.")
        else:
            cursor.execute("""
                INSERT INTO story (storyname, author, image, content, created_at)
                VALUES (%s, %s, %s, %s, %s)
            """, (title, author_name, image_url, description, created_at))
            conn.commit()
            story_id = cursor.lastrowid

            # Lấy thể loại truyện lan dau craw
            try:
                infor_div = soup.find('div', class_='info')
                if infor_div:
                    genre_tags = infor_div.find_all('a', itemprop='genre')
                    types = [tag.text.strip() for tag in genre_tags] if genre_tags else []
                    for story_type in types:
                        cursor.execute("""
                            INSERT INTO type (story_id, story_type, created_at)
                            VALUES (%s, %s, %s)
                        """, (story_id, story_type, created_at))
                    conn.commit()
            except Exception as e:
                print(f"Error extracting and storing types: {e}")


        # Kiểm tra chương lớn nhất đã có trong database
        cursor.execute("SELECT MAX(chapternum) FROM chapter WHERE story_id = %s", (story_id,))
        last_chapter = cursor.fetchone()[0]
        last_chapter = last_chapter if last_chapter else 0

        # Xác định chương bắt đầu crawl
        start_chapter = max(start_chapter, last_chapter + 1)

        # Crawl các chương mới
        for chapter_number in range(start_chapter, end_chapter):
            result = crawl_and_store_chapter(story_id, title, chapter_number)
            if result == 'stop':
                break

        return {
            'id': story_id,
            'title': title,
            'author': author_name,
            'image': image_url,
            'content': description
        }
    except Exception as e:
        print(f"Error: {e}")
        return None

def crawl_and_store_chapter(story_id, story_name, chapter_number):
    """
    Crawls a chapter from a story and stores it in localhost database.

    Args:
        story_name (str): Name of the story
        chapter_number (int): Chapter number to crawl
        base_url (str): Base URL of the website (default: "https://truyenfull.vision")

    Returns:
        dict: Dictionary containing chapter details and operation status
    """
    base_url = "https://truyenfull.vision"
    slug = slugify(story_name)
    url = f"{base_url}/{slug}/chuong-{chapter_number}/"

    try:
        # Send GET request
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            return 'stop'

        # Parse HTML
        soup = BeautifulSoup(response.text, 'html.parser')

        # Try multiple possible title locations
        title_elem = soup.find(class_='chapter-title')

        # Find content
        content_div = soup.find('div', class_='chapter-c')

        # Extract title
        chapter_title = title_elem.text.strip().split(":")[-1] if title_elem else f"Chapter {chapter_number}"

        # Extract content
        if content_div:
            for script in content_div(["script", "style"]):
                script.decompose()
            content = content_div.get_text(separator='\n').strip()
        else:
            content = "Content not found"

        if content == "Content not found":
            return 'stop'

        cursor.execute("""
            INSERT INTO chapter (story_id, chaptername, chapternum, content, created_at)
            VALUES (%s, %s, %s, %s, %s)
        """, (story_id, chapter_title, chapter_number, content, datetime.now()))
        conn.commit()
        return 'continue'
    except Exception as e:
        print(f"Error crawling chapter {chapter_number}: {e}")
        return 'stop'

# Test crawl với truyện Kiếm Lai
if __name__ == "__main__":
    test_url = "https://truyenfull.vision/cai-chet-cua-thai-tu-phi"
    #Thứ tự các tham số: đường dẫn truyện -> chương bắt đầu -> chương kết thúc - 1
    result = crawl_and_store_story(test_url, start_chapter=1, end_chapter=101)
    if result:
        print(f"Crawled story: {result}")
    else:
        print("Failed to crawl story Kiếm Lai.")
