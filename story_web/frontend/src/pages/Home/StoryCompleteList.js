import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import StoryItem from './StoryItem';

function StoryCompleteList({ stories }) {
    return (
        <div className="section-stories-image" style={{margin: '40px 0 60px'}}>
            <div className='grid wide'>
                <div className='row head-title-global'>
                    <div className='col c-6 m-4 l-4 head-title-global__left'>
                        <span className='head-title-global__content'>
                            Truyện Đã Hoàn Thành
                        </span>
                        <FontAwesomeIcon icon={faFire}></FontAwesomeIcon>
                    </div>
                </div>
                <div className="row">
                    <div className="col c-12">
                        <div className="section-stories-image__list">
                            {stories
                                .filter(story => story.id >= 17 && story.id <= 32)
                                .map(story => (
                                    <StoryItem 
                                        key={story.id}
                                        story={story}
                                        variant="complete"
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryCompleteList;