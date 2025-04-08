import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Chapter.scss';

function Chapter() {
    const { storyId, chapterId } = useParams();
    console.log(storyId, chapterId);
    const [chapter, setChapter] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/chapters/story/${storyId}/chapter/${chapterId}`)
            .then((res) => setChapter(res.data))
            .catch((err) => console.error(err));
    }, [storyId, chapterId]);

    if (!chapter) return <div>Đang tải chương...</div>;

    return (
        <div className="chapter-page">
            <h1>{chapter.chaptername}</h1>
            <div className="chapter-content">
                {chapter.content}
            </div>
        </div>
    );
}

export default Chapter;
