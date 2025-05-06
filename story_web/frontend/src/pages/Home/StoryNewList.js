import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import StoryItem from './StoryItem';

function StoryNewList({ stories }) {
    return (
        <div className='section-stories-no-image'>
            <div className='row head-title-global' style={{marginBottom: '12px'}}>
                <div className='head-title-global__left col c-6 m-4 l-4'>
                    <span className='head-title-global__content'>
                        Truyện Mới
                    </span>
                    <FontAwesomeIcon icon={faFire}></FontAwesomeIcon>
                </div>
            </div>
            <div className='row'>
                <div className='col c-12'>
                    <div className='section-stories-no-image__list'>
                        {stories
                            .filter(story => story.id >= 1 && story.id <= 18)
                            .map(story => (
                                <StoryItem 
                                    key={story.id}
                                    story={story}
                                    variant="new"
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryNewList;