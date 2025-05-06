import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ListCateGory from '../Home/ListCategory';
import StoryList from './StoryList';
import '../Home/HomePage.scss';
import './CategoryPage.scss';
const CategoryPage = () => {
    const { category } = useParams();
    const [stories, setStories] = useState([]);

    // Map slug đến tên thể loại
    const slugToType = {
        'tien-hiep': 'Tiên Hiệp',
        'kiem-hiep': 'Kiếm Hiệp',
        'ngon-tinh': 'Ngôn Tình',
        'dam-my': 'Đam Mỹ',
        'quan-truong': 'Quan Trường',
        'vong-du': 'Võng Du',
        'khoa-huyen': 'Khoa Huyễn',
        'he-thong': 'Hệ Thống',
        'huyen-huyen': 'Huyền Huyễn',
        'di-gioi': 'Dị Giới',
        'di-nang': 'Dị Năng',
        'sac': 'Sắc',
        'quan-su': 'Quân Sự',
        'lich-su': 'Lịch Sử',
        'xuyen-khong': 'Xuyên Không',
        'xuyen-nhanh': 'Xuyên Nhanh',
        'trong-sinh': 'Trọng Sinh',
        'trinh-tham': 'Trinh Thám',
        'tham-hiem': 'Thám Hiểm',
        'linh-di': 'Linh Dị',
        'nguoc': 'Ngược',
        'sung': 'Sủng',
        'cung-dau': 'Cung Đấu',
        'nu-cuong': 'Nữ Cường',
        'gia-dau': 'Gia Đấu',
        'dong-phuong': 'Đông Phương',
        'do-thi': 'Đô Thị',
        'bach-hop': 'Bách Hợp',
        'hai-huoc': 'Hài Hước',
        'dien-van': 'Điền Văn',
        'co-dai': 'Cổ Đại',
        'mat-the': 'Mạt Thế',
        'truyen-teen': 'Truyện Teen',
        'phuong-tay': 'Phương Tây',
        'nu-phu': 'Nữ Phụ',
        'Light Novel': 'Light Novel',
        'viet-nam': 'Việt Nam',
        'doan-van': 'Đoản Văn',
        'review-sach': 'Review sách',
        'khac': 'Khác',
        // Thêm các mapping khác tại đây
    };

    useEffect(() => {
        const fetchStories = async () => {
            try {
                const res = category 
                    ? await axios.get(`http://localhost:5000/api/stories/category/${category}`)
                    : await axios.get('http://localhost:5000/api/stories');
                console.log("Dữ liệu truyện:", res.data);
                setStories(res.data);
            } catch (err) {
                console.error("Lỗi tải dữ liệu:", err);
            }
        };

        fetchStories();
    }, [category]);

    const categoryName = slugToType[category] || 'Tất cả';
    return (
        <div className='grid wide'>
            <div className='row' style={{alignItems:'start'}}>
                <div className='col c-12 m-8 l-9'>
                    <StoryList stories={stories} categoryName={categoryName} />
                </div>
                <div className='col c-12 m-4 l-3 sticky-top'>
                    <ListCateGory />
                </div>
            </div>
        </div>
    );
};

export default CategoryPage;
