import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import StoryItem from './StoryItem';

function StoryHotList({ stories }) {
    return (
        <div className="section-stories-image">
            <div className='grid wide'>
                <div className='row head-title-global'>
                    <div className='col c-6 m-4 l-4 head-title-global__left'>
                        <span className='head-title-global__content'>
                            Truyện Hot
                        </span>
                        <FontAwesomeIcon icon={faFire}></FontAwesomeIcon>
                    </div>
                    <div className='col c-4 m-3 l-2'>
                        <select name="" id="" className="form-select" aria-label="Truyen hot">
                            <option value="">Tất cả</option>
                            <option value="1">Ngôn Tình</option>
                            <option value="2">Trọng Sinh</option>
                            <option value="3">Cổ Đại</option>
                            <option value="4">Tiên Hiệp</option>
                            <option value="5">Huyền huyễn</option>
                            <option value="6">Khác</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col c-12">
                        <div className="section-stories-image__list">
                            {stories
                                .filter(story => story.id >= 1 && story.id <= 16)
                                .map(story => (
                                    <StoryItem 
                                        key={story.id}
                                        story={story}
                                        variant="hot"
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StoryHotList;