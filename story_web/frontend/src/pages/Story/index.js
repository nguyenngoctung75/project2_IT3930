import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Story.scss';

function Story() {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [chapters, setChapters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storyRes = await axios.get(`http://localhost:5000/api/stories/${id}`);
                setStory(storyRes.data);

                const chapterRes = await axios.get(`http://localhost:5000/api/chapters/story/${id}`);
                setChapters(chapterRes.data);
            } catch (err) {
                console.error("Lỗi khi lấy truyện:", err);
            }
        };
        fetchData();
    }, [id]);

    if (!story) return <div>Đang tải...</div>;

    return (
        <div className="story-page">
            <div className="story-info">
                <img src={story.image} alt={story.storyname} className="story-image" />
                <div className="story-details">
                    <h1>{story.storyname}</h1>
                    <p><strong>Tác giả:</strong> {story.author}</p>
                    <p>{story.content}</p>
                </div>
            </div>

            <div className="chapter-list">
                <h2>Danh sách chương</h2>
                <ul>
                    {chapters.map(chap => (
                        <li key={chap.id}>
                            <a href={`/story/${id}/chapter/${chap.id}`}>
                                Chương {chap.chapternum}: {chap.chaptername}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Story;
