import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './StoryPage.scss';
import ListCateGory from '../Home/ListCategory';
import StoryHeader from './StoryHeader';
import StoryInfo from './StoryInfo';
import StoryRating from './StoryRating';
import StoryContent from './StoryContent';
import ChapterList from './ChapterList';

function StoryPage() {
    const { id } = useParams();
    const [story, setStory] = useState(null);
    const [chapters, setChapters] = useState([]);
    const [isExpanded, setIsExpanded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [storyRes, chapterRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/stories/${id}`),
                    axios.get(`http://localhost:5000/api/chapters/story/${id}`)
                ]);
                setStory(storyRes.data);
                setChapters(chapterRes.data);
            } catch (err) {
                console.error("Lỗi khi lấy truyện:", err);
                setError(err.message);
                setStory({ 
                    storyname: 'Lỗi tải truyện',
                    content: 'Không thể tải nội dung truyện',
                    image: '' 
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const totalPages = Math.ceil(chapters.length / 50);

    if (loading) return <div className="loading">Đang tải...</div>;
    if (error) return <div className="error">Đã xảy ra lỗi: {error}</div>;

    return (
        <div className='grid wide'>
            <div className='row' style={{alignItems:'flex-start'}}>
                <div className='col c-12 m-8 l-9'>
                    <StoryHeader />
                    
                    <div className='story-detail'>
                        <div className='story-detail__top'>
                            <div className='row' style={{alignItems: 'flex-start'}}>
                                <div className='col c-12 m-12 l-3 story-detail__top--image'>
                                    {story.image && (
                                        <div className='book-3d'>
                                            <img src={story.image} alt={story.storyname} loading='lazy'/>
                                        </div>
                                    )}
                                </div>
                                <div className='col c-12 m-12 l-9'>
                                    <div className='story-name'>{story.storyname}</div>
                                    <StoryRating />
                                    <StoryContent 
                                        content={story.content} 
                                        isExpanded={isExpanded}
                                        setIsExpanded={setIsExpanded}
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className='story-detail__bottom'>
                            <div className='row'>
                                <StoryInfo story={story} />
                            </div>
                        </div>

                        <ChapterList 
                            storyName={story.storyname}
                            chapters={chapters}
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => {
                                setCurrentPage(page);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            storyId={id}
                        />
                    </div>
                </div>
                <div className='col c-12 m-4 l-3 sticky-top'>
                    <ListCateGory />
                </div>
            </div>
        </div>
    );
}

export default StoryPage;