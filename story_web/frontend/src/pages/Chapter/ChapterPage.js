import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './ChapterPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import sanitizeStoryContent from '~/utils/sanitizeStoryContent';

function ChapterPage() {
    const navigate = useNavigate();
    const [showChapterList, setShowChapterList] = useState(false);

    const handleRefresh = (e) => {
        e.preventDefault();
        navigate(0); // Số 0 sẽ reload trang hiện tại
    };

    const handlePrevChapter = (e) => {
        e.preventDefault();
        if (chapterNum > 1) {
            navigate(`/story/${storyId}/chapter/${parseInt(chapterNum) - 1}`);
        }
    };

    const handleNextChapter = (e) => {
        e.preventDefault();
        if (story && chapterNum < story.chapterCount) {
            navigate(`/story/${storyId}/chapter/${parseInt(chapterNum) + 1}`);
        }
    };

    const toggleChapterList = () => {
        setShowChapterList(!showChapterList);
    };

    const { storyId, chapterNum } = useParams();
    const [chapter, setChapter] = useState(null);
    const [story, setStory] = useState(null);

    // Xử lý chương trước/sau
    const goToPrevChapter = () => {
        if (chapterNum > 1) {
            navigate(`/story/${storyId}/chapter/${parseInt(chapterNum) - 1}`);
        }
    };

    const goToNextChapter = () => {
        if (story && chapterNum < story.chapterCount) {
            navigate(`/story/${storyId}/chapter/${parseInt(chapterNum) + 1}`);
        }
    };

    // Lắng nghe sự kiện bàn phím
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') {
                goToPrevChapter();
            } else if (e.key === 'ArrowRight') {
                goToNextChapter();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [chapterNum, story]); // Thêm dependencies để cập nhật đúng giá trị

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [chapterRes, storyRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/chapters/story/${storyId}/chapter/${chapterNum}`),
                    axios.get(`http://localhost:5000/api/stories/${storyId}`)
                ]);
                setChapter(chapterRes.data);
                setStory(storyRes.data);
            } catch (err) {
                console.error("Lỗi khi lấy chương hoặc truyện:", err);
            }
        }
        fetchData();
    }, [storyId, chapterNum]);

    if (!chapter) return <div>Đang tải chương...</div>;

    return (

        <div className='chapter-wrapper'>
            <Link to={`/story/${storyId}`}>
                <h1>{story.storyname}</h1>
            </Link>
            <Link to="" onClick={handleRefresh}>
                <p>Chương {chapter.chapternum}: {chapter.chaptername}</p>
            </Link>
            <div className='chapter-nav'>
                <div className='chapter-actions'>
                    <Link to="" className={`chapter-prev ${chapterNum <= 1 ? 'disabled' : ''}`} onClick={handlePrevChapter}>
                        <span>Chương trước</span>
                    </Link>

                    <button className='chapter-jump' onClick={toggleChapterList}>
                        <FontAwesomeIcon icon={faListUl} className={`chapter-list-icon ${showChapterList ? 'active' : ''}`} />
                        {showChapterList && (
                            <div className="chapter-list-dropdown">
                                {Array.from({ length: story.chapterCount }, (_, i) => i + 1).map(chapNum => (
                                    <Link
                                        key={chapNum}
                                        to={`/story/${storyId}/chapter/${chapNum}`}
                                        className={chapNum === parseInt(chapterNum) ? 'active' : ''}
                                    >
                                        Chương {chapNum}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </button>

                    <Link to="" className={`chapter-next ${chapterNum >= story.chapterCount ? 'disabled' : ''}`} onClick={handleNextChapter}>
                        <span>Chương sau</span>
                    </Link>
                </div>
            </div>

            <div className='chapter-content'>
                <div dangerouslySetInnerHTML={{ __html: sanitizeStoryContent(chapter.content) }} />
            </div>
        </div>
    );
}

export default ChapterPage;
