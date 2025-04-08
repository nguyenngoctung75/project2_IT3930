import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import './Home.scss';
import axios from 'axios';

function Home() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/stories') // chỉnh lại URL nếu cần
            .then(res => {
                const filtered = res.data.filter(story => story.id >= 1 && story.id <= 12);
                setStories(filtered);
            })
            .catch(err => console.error(err));
    }, []);

    return ( 
        <div className="section-stories-hot">
            <div className='grid wide'>
                <div className='row head-title-global'>
                    <div className='col c-6 m-4 l-4 head-title-global__left'>
                        <span className='head-title-global__content'>
                            Truyện Hot
                        </span>
                        <FontAwesomeIcon icon={faFire}></FontAwesomeIcon>
                    </div>
                    <div className='col c-4 m-3 l-2'>
                        <select name="" id="" class="form-select select-stories-hot" aria-label="Truyen hot">
                            <option selected="">Tất cả</option>
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
                        <div className="section-stories-hot__list">
                            {stories.map(story => (
                                <div className="story-item" key={story.id}>
                                    <Link to={`/story/${story.id}`}>
                                        <div
                                            className="story-item__image"
                                            style={{ backgroundImage: `url(${story.image})` }}
                                        />
                                        <div className="story-item__name">
                                            {story.storyname}
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;