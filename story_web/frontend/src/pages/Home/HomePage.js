import { useEffect, useState } from 'react';
import axios from 'axios';
import StoryHotList from './StoryHotList';
import StoryNewList from './StoryNewList';
import ListCateGory from './ListCategory';
import StoryCompleteList from './StoryCompleteList';
import './HomePage.scss';
import Story from '../Story';

function HomePage() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/stories')
            .then(res => setStories(res.data))
            .catch(err => console.error(err));
    }, []);

    return ( 
        <div>
            <StoryHotList stories={stories} />
            <div className='grid wide'>
                <div className='row' style={{alignItems:'start'}}>
                    <div className='col c-12 m-8 l-9'>
                        <StoryNewList stories={stories} />
                    </div>
                    <div className='col c-12 m-4 l-3 sticky-top'>
                        <ListCateGory />
                    </div>
                </div>
            </div>
            <StoryCompleteList stories={stories}/>
        </div>
    );
}

export default HomePage;