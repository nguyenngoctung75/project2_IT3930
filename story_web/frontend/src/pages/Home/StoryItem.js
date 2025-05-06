import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import convertToSlug from '~/utils/convertToSlug';

function StoryItem({ story, variant = 'hot' }) {
    if (variant === 'hot') {
        return (
            <div className="story-item__have-image">
                <Link to={`/story/${story.id}`}>
                    <div
                        className="story-item__have-image__image"
                        style={{ backgroundImage: `url(${story.image})` }}
                    />
                    <div className="story-item__have-image__name">
                        {story.storyname}
                    </div>
                    <div className="list-badge">
                        <span className='story-item__badge full'>Full</span>
                        <span className='story-item__badge hot'>Hot</span>
                        <span className='story-item__badge new'>New</span>
                    </div>
                </Link>
            </div>
        );
    } else if (variant === 'complete') {
        return (
            <div className="story-item__have-image">
                <Link to={`/story/${story.id}`}>
                    <div
                        className="story-item__have-image__image"
                        style={{ backgroundImage: `url(${story.image})` }}
                    />
                    <div className="story-item__have-image__name">
                        {story.storyname}
                    </div>
                    <div className="list-badge">
                        <span className='story-item__badge full'>Full - {story.chapterCount} chương</span>
                    </div>
                </Link>
            </div>
        );
    }

    return (
        <div className="story-item__no-image">
            <div className="story-item__no-image__title">
                <h3>
                    <FontAwesomeIcon icon={faChevronRight}/>
                    <Link to={`/story/${story.id}`}>
                        <div className='story-item__no-image__name'>
                            {story.storyname}
                        </div>
                    </Link>
                </h3>
                <span className='story-item__badge full'>Full</span>
                <span className='story-item__badge hot'>Hot</span>
                <span className='story-item__badge new'>New</span>
            </div>
            <div className="story-item__no-image__category">
                {story.types && story.types.length > 0 && story.types.slice(0, 3).map((type, index) => (
                    <p key={index}>
                        <Link to={`/category/${convertToSlug(type.story_type)}`}>
                            {type.story_type}
                        </Link>
                        {index < story.types.length - 1 && <span style={{marginRight: 4}}>, </span>}
                    </p>
                ))}
            </div>
            <div className='story-item__no-image__chapter'>
                <p>
                    <Link to={`/story/${story.id}/chapter/${story.chapterCount}`}>
                        Chương {story.chapterCount}
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default StoryItem;