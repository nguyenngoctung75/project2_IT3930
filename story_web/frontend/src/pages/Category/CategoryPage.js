import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
    const { category } = useParams();
    const [stories, setStories] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/stories/category/${category}`)
            .then(response => {
                console.log("Dữ liệu truyện:", response.data);
                setStories(response.data)})
            .catch(error => console.error("Lỗi tải dữ liệu:", error));
    }, [category]);

    return (
        <div>
            <h1>Thể loại: {category}</h1>
            <ul>
                {stories.map(story => (
                    <li key={story.id}>
                        <img src={story.image} alt={story.storyname} width={100} />
                        <h3>{story.storyname}</h3>
                        <p>{story.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryPage;
