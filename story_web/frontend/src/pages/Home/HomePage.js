import { useEffect, useState } from 'react';
import * as storyService from '~/services/storyService';
import StoryHotList from './StoryHotList';
import StoryNewList from './StoryNewList';
import ListCateGory from './ListCategory';
import StoryCompleteList from './StoryCompleteList';
import './HomePage.scss';

function HomePage() {
    const [stories, setStories] = useState([]);

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const data = await storyService.getAllStories();
                setStories(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchStories();
    }, []);

    return (
        <div>
            <StoryHotList stories={stories} />
            <div className='grid wide'>
                <div className='row' style={{ alignItems: 'start' }}>
                    <div className='col c-12 m-8 l-9'>
                        <StoryNewList stories={stories} />
                    </div>
                    <div className='col c-12 m-4 l-3 sticky-top'>
                        <ListCateGory />
                    </div>
                </div>
            </div>
            <StoryCompleteList stories={stories} />
        </div>
    );
}

export default HomePage;
