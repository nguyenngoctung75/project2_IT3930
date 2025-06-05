import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '~/utils/AuthContext';
import { toast } from '~/utils/toast-message';
import './AddChapter.scss';

function AddChapter() {
    const { storyId } = useParams();
    const navigate = useNavigate();
    const { userRole } = useContext(AuthContext);
    const token = localStorage.getItem('token');

    const [chapter, setChapter] = useState({
        chaptername: '',
        content: '',
        storyId: storyId, // Lưu storyId để gửi trong request
    });
    const [nextChapternum, setNextChapternum] = useState(1); // State để lưu số chương tiếp theo
    const [error, setError] = useState(null);

    // Kiểm tra quyền truy cập và lấy số chương tiếp theo
    useEffect(() => {
        // if (!userRole || !['admin', 'author'].includes(userRole)) {
        //     toast({
        //         title: 'Quyền truy cập bị từ chối!',
        //         message: 'Bạn không có quyền thêm chương.',
        //         type: 'warning',
        //         duration: 3000,
        //     });
        //     navigate('/admin/stories');
        //     return;
        // }

        // Lấy danh sách chương để tính số chương tiếp theo
        const fetchChapters = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/chapters/story/${storyId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const maxChapternum = res.data.length > 0 ? Math.max(...res.data.map(ch => ch.chapternum)) : 0;
                setNextChapternum(maxChapternum + 1);
            } catch (err) {
                setError(`Lỗi khi lấy danh sách chương: ${err.response?.data?.message || err.message}`);
                console.error("Lỗi lấy danh sách chương:", err);
            }
        };
        fetchChapters();
    }, [storyId, token, userRole, navigate]);

    // Xử lý thay đổi input
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChapter(prev => ({ ...prev, [name]: value }));
    };

    // Xử lý thêm chương
    const handleAddChapter = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/chapters`, {
                chaptername: chapter.chaptername,
                content: chapter.content,
                story_id: storyId, // Gửi storyId trong request
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({
                title: 'Thành công!',
                message: `Thêm chương ${nextChapternum} thành công!`,
                type: 'success',
                duration: 3000,
            });
            navigate(`/admin/edit-story/${storyId}`);
        } catch (err) {
            setError(`Lỗi khi thêm chương: ${err.response?.data?.message || err.message}`);
            toast({
                title: 'Thất bại!',
                message: `Lỗi thêm chương: ${err.response?.data?.message || err.message}`,
                type: 'error',
                duration: 3000,
            });
            console.error("Lỗi thêm chương:", err);
        }
    };

    if (error) {
        return (
            <div className="add-chapter">
                <h2>Lỗi</h2>
                <p>{error}</p>
                <button onClick={() => navigate(`/admin/edit-story/${storyId}`)}>Quay lại</button>
            </div>
        );
    }

    return (
        <div className="add-chapter">
            <h2>Thêm chương mới (Chương {nextChapternum})</h2>
            <form onSubmit={handleAddChapter}>
                <input
                    type="text"
                    name="chaptername"
                    value={chapter.chaptername}
                    onChange={handleInputChange}
                    placeholder="Tên chương"
                />
                <textarea
                    name="content"
                    value={chapter.content}
                    onChange={handleInputChange}
                    placeholder="Nội dung chương"
                    required
                />
                <div className="form-buttons">
                    <button type="submit" className="submit-button">Thêm chương</button>
                    <button type="button" className="cancel-button" onClick={() => navigate(`/admin/edit-story/${storyId}`)}>Hủy</button>
                </div>
            </form>
        </div>
    );
}

export default AddChapter;