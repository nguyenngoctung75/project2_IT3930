import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '~/utils/AuthContext';
import { toast } from '~/utils/toast-message';
import './EditStory.scss';

function EditStory() {
    const { storyId } = useParams();
    const navigate = useNavigate();
    const { userRole } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [story, setStory] = useState({
        storyname: '',
        author: '',
        image: '',
        content: '',
        types: [],
    });
    const [chapters, setChapters] = useState([]);
    const [error, setError] = useState(null);

    const availableTypes = [
        'Tiên Hiệp', 'Kiếm Hiệp', 'Ngôn Tình', 'Đam Mỹ', 'Quan Trường', 'Võng Du', 'Khoa Huyễn',
        'Hệ Thống', 'Huyền Huyễn', 'Dị Giới', 'Dị Năng', 'Sắc', 'Quân Sự', 'Lịch Sử', 'Xuyên Không',
        'Xuyên Nhanh', 'Trọng Sinh', 'Trinh Thám', 'Thám Hiểm', 'Linh Dị', 'Ngược', 'Sủng', 'Cung Đấu',
        'Nữ Cường', 'Gia Đấu', 'Đông Phương', 'Đô Thị', 'Bách Hợp', 'Hài Hước', 'Điền Văn', 'Cổ Đại',
        'Mạt Thế', 'Truyện Teen', 'Phương Tây', 'Nữ Phụ', 'Light Novel', 'Việt Nam', 'Đoản Văn',
        'Review sách', 'Khác'
    ];

    // Lấy thông tin truyện và danh sách chương
    useEffect(() => {
        const fetchStoryAndChapters = async () => {
            try {
                // Lấy thông tin truyện
                const storyRes = await axios.get(`http://localhost:5000/api/stories/${storyId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setStory({
                    storyname: storyRes.data.storyname,
                    author: storyRes.data.author,
                    image: storyRes.data.image || '',
                    content: storyRes.data.content,
                    types: storyRes.data.types.map(type => type.story_type),
                });

                // Lấy danh sách chương
                const chaptersRes = await axios.get(`http://localhost:5000/api/chapters/story/${storyId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setChapters(chaptersRes.data);
            } catch (err) {
                setError(`Lỗi khi tải dữ liệu: ${err.response?.data?.message || err.message}`);
                console.error("Lỗi tải dữ liệu:", err);
            }
        };

        // if (!userRole || !['admin', 'author'].includes(userRole)) {
        //     toast({
        //         title: 'Quyền truy cập bị từ chối!',
        //         message: 'Bạn không có quyền chỉnh sửa truyện.',
        //         type: 'warning',
        //         duration: 3000,
        //     });
        //     navigate('/admin/stories');
        //     return;
        // }

        fetchStoryAndChapters();
    }, [storyId, token, userRole, navigate]);

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStory(prev => ({ ...prev, [name]: value }));
    };

    // Xử lý thay đổi thể loại
    const handleTypeChange = (type) => {
        setStory(prev => {
            const currentTypes = prev.types || [];
            if (currentTypes.includes(type)) {
                return { ...prev, types: currentTypes.filter(t => t !== type) };
            } else {
                return { ...prev, types: [...currentTypes, type] };
            }
        });
    };

    // Xử lý cập nhật truyện
    const handleUpdateStory = async (e) => {
        e.preventDefault();
        if (!story.types || story.types.length === 0) {
            toast({
                title: 'Cảnh báo!',
                message: 'Vui lòng chọn ít nhất một thể loại cho truyện!',
                type: 'warning',
                duration: 3000,
            });
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/stories/${storyId}`, {
                storyname: story.storyname,
                author: story.author,
                image: story.image,
                content: story.content,
                types: story.types,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({
                title: 'Thành công!',
                message: 'Cập nhật truyện thành công!',
                type: 'success',
                duration: 3000,
            });
            navigate('/admin/stories');
        } catch (err) {
            toast({
                title: 'Thất bại!',
                message: `Lỗi cập nhật truyện: ${err.response?.data?.message || err.message}`,
                type: 'error',
                duration: 3000,
            });
            console.error("Lỗi cập nhật truyện:", err);
        }
    };

    // Xử lý xóa chương
    const handleDeleteChapter = async (chapternum) => {
        if (window.confirm(`Bạn có chắc muốn xóa chương ${chapternum}?`)) {
            try {
                await axios.delete(`http://localhost:5000/api/chapters/story/${storyId}/chapter/${chapternum}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                toast({
                    title: 'Thành công!',
                    message: `Xóa chương ${chapternum} thành công!`,
                    type: 'success',
                    duration: 3000,
                });
                setChapters(chapters.filter(chapter => chapter.chapternum !== chapternum));
            } catch (err) {
                toast({
                    title: 'Thất bại!',
                    message: `Lỗi xóa chương: ${err.response?.data?.message || err.message}`,
                    type: 'error',
                    duration: 3000,
                });
                console.error("Lỗi xóa chương:", err);
            }
        }
    };

    // Xử lý chỉnh sửa chương
    const handleEditChapter = (chapternum) => {
        navigate(`/admin/edit-chapter/${storyId}/${chapternum}`);
    };

    if (error) {
        return (
            <div className="edit-story">
                <h2>Lỗi</h2>
                <p>{error}</p>
                <button onClick={() => navigate('/admin/stories')}>Quay lại</button>
            </div>
        );
    }

    if (!story.storyname) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className="edit-story">
            <h2>Chỉnh sửa truyện: {story.storyname}</h2>
            
            <form onSubmit={handleUpdateStory} className="edit-story-form">
                <input
                    type="text"
                    name="storyname"
                    value={story.storyname}
                    onChange={handleInputChange}
                    placeholder="Tên truyện"
                    required
                />
                <input
                    type="text"
                    name="author"
                    value={story.author}
                    onChange={handleInputChange}
                    placeholder="Tác giả"
                    required
                />
                <input
                    type="text"
                    name="image"
                    value={story.image}
                    onChange={handleInputChange}
                    placeholder="URL ảnh bìa"
                />
                <textarea
                    name="content"
                    value={story.content}
                    onChange={handleInputChange}
                    placeholder="Mô tả truyện"
                    required
                />
                <div className="types-selection">
                    <label>Thể loại:</label>
                    <div className="types-list">
                        {availableTypes.map((type) => (
                            <label key={type} className="type-checkbox">
                                <input
                                    type="checkbox"
                                    checked={story.types.includes(type)}
                                    onChange={() => handleTypeChange(type)}
                                />
                                {type}
                            </label>
                        ))}
                    </div>
                </div>
                <button type="submit">Cập nhật truyện</button>
                <button type="button" onClick={() => navigate('/admin/stories')}>Hủy</button>
            </form>

            <div className="chapters-list">
                <h3>Danh sách chương</h3>
                {chapters.length === 0 ? (
                    <p>Truyện này chưa có chương nào.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>Số chương</th>
                                <th>Tên chương</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chapters.map(chapter => (
                                <tr key={chapter.id}>
                                    <td>{chapter.chapternum}</td>
                                    <td>{chapter.chaptername || `Chương ${chapter.chapternum}`}</td>
                                    <td>
                                        <button
                                            className="action-button edit"
                                            onClick={() => handleEditChapter(chapter.chapternum)}
                                        >
                                            Sửa
                                        </button>
                                        <button
                                            className="action-button delete"
                                            onClick={() => handleDeleteChapter(chapter.chapternum)}
                                        >
                                            Xóa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default EditStory;