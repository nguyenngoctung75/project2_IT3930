import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import StoryItem from './StoryItem';
import Pagination from '~/utils/pagination';

function StoryList({ stories, categoryName }) {
    const itemsPerPage = 20;
    const totalPages = Math.ceil(stories.length / itemsPerPage);

    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStories = stories.slice(indexOfFirstItem, indexOfLastItem);
    return (
        <div className='section-stories-no-image'>
            <div className='row head-title-global' style={{marginBottom: '12px'}}>
                <div className='head-title-global__left col c-6 m-4 l-4'>
                    <span className='head-title-global__content'>
                        Truyện {categoryName}
                    </span>
                    <FontAwesomeIcon icon={faBookOpen}/>
                </div>
            </div>
            <div className='row'>
                <div className='col c-12'>
                    <div className='section-stories-category__list'>
                        {currentStories
                            .map(story => (
                                <StoryItem 
                                    key={story.id}
                                    story={story}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}

export default StoryList;