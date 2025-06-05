import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '~/utils/AuthContext';
import { toast } from '~/utils/toast-message';
import './StoryShow.scss';

function StoryShow() {
    const [stories, setStories] = useState([]);
    const [newStory, setNewStory] = useState({ title: '', author: '', content: '', image: '', types: [] });
    const [showAddForm, setShowAddForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { userRole, user } = useContext(AuthContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    // Danh sách thể loại
    const availableTypes = [
        'Tiên Hiệp', 'Kiếm Hiệp', 'Ngôn Tình', 'Đam Mỹ', 'Quan Trường', 'Võng Du', 'Khoa Huyễn',
        'Hệ Thống', 'Huyền Huyễn', 'Dị Giới', 'Dị Năng', 'Sắc', 'Quân Sự', 'Lịch Sử', 'Xuyên Không',
        'Xuyên Nhanh', 'Trọng Sinh', 'Trinh Thám', 'Thám Hiểm', 'Linh Dị', 'Ngược', 'Sủng', 'Cung Đấu',
        'Nữ Cường', 'Gia Đấu', 'Đông Phương', 'Đô Thị', 'Bách Hợp', 'Hài Hước', 'Điền Văn', 'Cổ Đại',
        'Mạt Thế', 'Truyện Teen', 'Phương Tây', 'Nữ Phụ', 'Light Novel', 'Việt Nam', 'Đoản Văn',
        'Review sách', 'Khác'
    ];

    // Memoize fetchStories
    const fetchStories = useCallback(async (query = '') => {
        try {
            const res = await axios.get('http://localhost:5000/api/stories', {
                headers: { Authorization: `Bearer ${token}` },
                params: { search: query },
            });
            setStories(res.data);
        } catch (err) {
            toast({
                title: 'Lỗi!',
                message: `Lỗi tải dữ liệu: ${err.response?.data?.message || err.message}`,
                type: 'error',
                duration: 3000,
            });
            console.error("Lỗi tải dữ liệu:", err);
        }
    }, [token, setStories]);

    useEffect(() => {
        fetchStories();
    }, [fetchStories]);

    // Xử lý tìm kiếm
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        fetchStories(query);
    };

    // Xử lý chọn thể loại
    const handleTypeChange = (type) => {
        setNewStory((prev) => {
            const currentTypes = prev.types || [];
            if (currentTypes.includes(type)) {
                return { ...prev, types: currentTypes.filter(t => t !== type) };
            } else {
                return { ...prev, types: [...currentTypes, type] };
            }
        });
    };

    // Xử lý thêm truyện
    const handleAddStory = async (e) => {
        e.preventDefault();
        if (!newStory.types || newStory.types.length === 0) {
            toast({
                title: 'Cảnh báo!',
                message: 'Vui lòng chọn ít nhất một thể loại cho truyện!',
                type: 'warning',
                duration: 3000,
            });
            return;
        }

        try {
            const res = await axios.post('http://localhost:5000/api/stories/add', {
                storyname: newStory.title,
                author: newStory.author,
                image: newStory.image,
                content: newStory.content,
                uploader_id: user?.id,
                types: newStory.types,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({
                title: 'Thành công!',
                message: 'Thêm truyện thành công!',
                type: 'success',
                duration: 3000,
            });
            setStories([...stories, res.data]);
            setNewStory({ title: '', author: '', content: '', image: '', types: [] });
            setShowAddForm(false);
            fetchStories();
        } catch (err) {
            toast({
                title: 'Thất bại!',
                message: `Lỗi thêm truyện: ${err.response?.data?.message || err.message}`,
                type: 'error',
                duration: 3000,
            });
            console.error("Lỗi thêm truyện:", err);
        }
    };

    // Xử lý xóa truyện
    const handleDeleteStory = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa truyện này?')) {
            try {
                await axios.delete(`http://localhost:5000/api/stories/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast({
                    title: 'Thành công!',
                    message: 'Xóa truyện thành công!',
                    type: 'success',
                    duration: 3000,
                });
                setStories(stories.filter(story => story.id !== id));
            } catch (err) {
                toast({
                    title: 'Thất bại!',
                    message: `Lỗi xóa truyện: ${err.response?.data?.message || err.message}`,
                    type: 'error',
                    duration: 3000,
                });
                console.error("Lỗi xóa truyện:", err);
            }
        }
    };

    // Chuyển hướng đến trang sửa truyện
    const handleEditStory = (id) => {
        navigate(`/admin/edit-story/${id}`);
    };

    // Chuyển hướng đến trang thêm chương
    const handleAddChapter = (id) => {
        navigate(`/admin/add-chapter/${id}`);
    };

    return (
        <div className="story-management">
            <h2>Quản lý Truyện</h2>
            
            {/* Thanh tìm kiếm và nút đăng truyện */}
            <div className="search-add-container">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Tìm theo tên truyện hoặc tác giả..."
                    className="search-input"
                />
                {(userRole === 'admin' || userRole === 'author') && (
                    <button
                        className="add-story-button"
                        onClick={() => setShowAddForm(!showAddForm)}
                    >
                        Đăng truyện mới
                    </button>
                )}
            </div>

            {/* Form đăng truyện */}
            {showAddForm && (
                <form onSubmit={handleAddStory} className="add-story-form">
                    <input
                        type="text"
                        value={newStory.title}
                        onChange={(e) => setNewStory({ ...newStory, title: e.target.value })}
                        placeholder="Tên truyện"
                        required
                    />
                    <input
                        type="text"
                        value={newStory.author}
                        onChange={(e) => setNewStory({ ...newStory, author: e.target.value })}
                        placeholder="Tác giả"
                        required
                    />
                    <input
                        type="text"
                        value={newStory.image}
                        onChange={(e) => setNewStory({ ...newStory, image: e.target.value })}
                        placeholder="URL ảnh bìa"
                    />
                    <textarea
                        value={newStory.content}
                        onChange={(e) => setNewStory({ ...newStory, content: e.target.value })}
                        placeholder="Nội dung giới thiệu"
                        required
                    />
                    <div className="types-selection">
                        <label>Thể loại:</label>
                        <div className="types-list">
                            {availableTypes.map((type) => (
                                <div key={type} className="type-checkbox">
                                    <input
                                        type="checkbox"
                                        checked={newStory.types.includes(type)}
                                        onChange={() => handleTypeChange(type)}
                                    />
                                    {type}
                                </div>
                            ))}
                        </div>
                    </div>
                    <button type="submit">Thêm truyện</button>
                    <button type="button" onClick={() => setShowAddForm(false)}>Hủy</button>
                </form>
            )}

            {/* Bảng danh sách truyện */}
            <table className="story-table">
                <thead>
                    <tr>
                        <th>Tên truyện</th>
                        <th>Tác giả</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {stories.map((story) => (
                        <tr key={story.id}>
                            <td>
                                <Link to={`/story/${story.id}`} className="story-link">
                                    {story.storyname}
                                </Link>
                            </td>
                            <td>{story.author}</td>
                            <td>
                                <button
                                    className="action-button add-chapter"
                                    onClick={() => handleAddChapter(story.id)}
                                    disabled={userRole !== 'admin' && userRole !== 'author'}
                                >
                                    Thêm chương
                                </button>
                                <button
                                    className="action-button edit"
                                    onClick={() => handleEditStory(story.id)}
                                    disabled={userRole !== 'admin' && userRole !== 'author'}
                                >
                                    Sửa truyện
                                </button>
                                <button
                                    className="action-button delete"
                                    onClick={() => handleDeleteStory(story.id)}
                                    disabled={userRole !== 'admin'}
                                >
                                    Xóa truyện
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StoryShow;