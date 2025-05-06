import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faPencil } from '@fortawesome/free-solid-svg-icons';

function StoryItem({ story }) {
    return (
        <div className="story-item-category">
            <div className='story-item-category__picture'>
                <Link to={`/story/${story.id}`}>
                    <img
                        className="story-item-category__image"
                        src={story.image}
                        alt={story.storyname}
                    />
                </Link>
            </div>
            <div className="story-item-category__title">
                <h3>
                    <Link to={`/story/${story.id}`}>
                        <FontAwesomeIcon icon={faBook} />
                        <div className='story-item-category__name'>
                            {story.storyname}
                        </div>
                    </Link>
                    <div>
                        <span className='story-item__badge full'>Full</span>&nbsp;
                        <span className='story-item__badge hot'>Hot </span>&nbsp;
                        <span className='story-item__badge new'>New </span>&nbsp;
                    </div>
                </h3>
                <h3>
                    <FontAwesomeIcon icon={faPencil}/>
                    <div className='story-item-category__author'>
                        {story.author}
                    </div>
                </h3>
            </div>
            <div className='story-item-category__chapter'>
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