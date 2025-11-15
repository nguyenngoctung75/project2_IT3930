CREATE DATABASE IF NOT EXISTS StoryDB;
USE StoryDB;

-- Bảng user
CREATE TABLE user (
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(100) NOT NULL,
    useravatar VARCHAR(255),
    role ENUM('author', 'admin', 'user') NOT NULL DEFAULT 'user'
);

-- Bảng story
CREATE TABLE story (
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id INT AUTO_INCREMENT PRIMARY KEY,
    uploader_id INT,
    storyname VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    image VARCHAR(255),
    content TEXT NOT NULL,
    rating DOUBLE DEFAULT 0,
    num_rates INT DEFAULT 0,
    num_views INT DEFAULT 0,
    num_likes INT DEFAULT 0,
    FOREIGN KEY (uploader_id) REFERENCES user(id) ON DELETE SET NULL
);

-- Bảng ratings
CREATE TABLE ratings (
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id INT AUTO_INCREMENT PRIMARY KEY,
    story_id INT,
    user_id INT,
    rating DOUBLE NOT NULL,
    FOREIGN KEY (story_id) REFERENCES story(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Bảng favorites (user thích story)
CREATE TABLE favorites (
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id INT AUTO_INCREMENT PRIMARY KEY,
    story_id INT,
    user_id INT,
    FOREIGN KEY (story_id) REFERENCES story(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Bảng comment
CREATE TABLE comment (
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id INT AUTO_INCREMENT PRIMARY KEY,
    story_id INT,
    user_id INT,
    reply_user_id INT NULL,
    content TEXT NOT NULL,
    FOREIGN KEY (story_id) REFERENCES story(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,
    FOREIGN KEY (reply_user_id) REFERENCES user(id) ON DELETE CASCADE
);

-- Bảng status (trạng thái của truyện)
CREATE TABLE status (
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id INT AUTO_INCREMENT PRIMARY KEY,
    story_id INT,
    story_status VARCHAR(100) NOT NULL,
    FOREIGN KEY (story_id) REFERENCES story(id) ON DELETE CASCADE
);

-- Bảng type (thể loại của truyện)
CREATE TABLE type (
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id INT AUTO_INCREMENT PRIMARY KEY,
    story_id INT,
    story_type VARCHAR(100) NOT NULL,
    FOREIGN KEY (story_id) REFERENCES story(id) ON DELETE CASCADE
);

-- Bảng chapter
CREATE TABLE chapter (
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    id INT AUTO_INCREMENT PRIMARY KEY,
    story_id INT,
    chaptername VARCHAR(255) NOT NULL,
    chapternum INT NOT NULL,
    content LONGTEXT NOT NULL,
    FOREIGN KEY (story_id) REFERENCES story(id) ON DELETE CASCADE
);

-- Bảng reading_his (lịch sử đọc)
CREATE TABLE reading_his (
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id INT AUTO_INCREMENT PRIMARY KEY,
    chapter_id INT,
    user_id INT,
    FOREIGN KEY (chapter_id) REFERENCES chapter(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
