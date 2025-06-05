import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from '~/utils/toast-message';
import './EditChapter.scss';

function EditChapter() {
    const { storyId, chapternum } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [chapter, setChapter] = useState({
        chapternum: '',
        chaptername: '',
        content: '',
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChapter = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/chapters/story/${storyId}/chapter/${chapternum}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setChapter({
                    chapternum: res.data.chapternum,
                    chaptername: res.data.chaptername || '',
                    content: res.data.content,
                });
            } catch (err) {
                setError(`Lỗi khi tải dữ liệu: ${err.response?.data?.message || err.message}`);
                console.error("Lỗi tải dữ liệu:", err);
            }
        };
        fetchChapter();
    }, [storyId, chapternum, token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setChapter(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateChapter = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/chapters/story/${storyId}/chapter/${chapternum}`, {
                chaptername: chapter.chaptername,
                content: chapter.content,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({
                title: 'Thành công!',
                message: `Cập nhật chương ${chapternum} thành công!`,
                type: 'success',
                duration: 3000,
            });
            navigate(`/admin/edit-story/${storyId}`);
        } catch (err) {
            toast({
                title: 'Thất bại!',
                message: `Lỗi cập nhật chương: ${err.response?.data?.message || err.message}`,
                type: 'error',
                duration: 3000,
            });
            console.error("Lỗi cập nhật chương:", err);
        }
    };

    if (error) {
        return (
            <div className="edit-chapter">
                <h2>Lỗi</h2>
                <p>{error}</p>
                <button onClick={() => navigate(`/admin/edit-story/${storyId}`)}>Quay lại</button>
            </div>
        );
    }

    if (!chapter.chapternum) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className="edit-chapter">
            <h2>Chỉnh sửa chương {chapter.chapternum}</h2>
            <form onSubmit={handleUpdateChapter}>
                <div>
                    <div style={{ marginBottom: '10px' }}>Tên chương: </div>
                    <input
                        type="text"
                        name="chaptername"
                        value={chapter.chaptername}
                        onChange={handleInputChange}
                        placeholder="Tên chương"
                        style={{ marginBottom: '10px' }}
                    />
                    <div style={{ marginBottom: '10px' }}>Nội dung: </div>
                    <textarea
                        name="content"
                        value={chapter.content}
                        onChange={handleInputChange}
                        placeholder="Nội dung chương"
                        required
                    />
                </div>
                <button type="submit">Cập nhật chương</button>
                <button type="button" onClick={() => navigate(`/admin/edit-story/${storyId}`)}>Hủy</button>
            </form>
        </div>
    );
}

export default EditChapter;