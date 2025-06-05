import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './HistoryPage.scss';
import { AuthContext } from '~/utils/AuthContext';
import { toast } from '~/utils/toast-message';

function HistoryPage() {
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // if (!user || !['admin', 'author', 'user'].includes(user.role)) {
                //     toast({
                //         title: 'Quyền truy cập bị từ chối!',
                //         message: 'Bạn cần đăng nhập để xem lịch sử.',
                //         type: 'warning',
                //         duration: 3000,
                //     });
                //     navigate('/login');
                //     return;
                // }

                const res = await axios.get(`http://localhost:5000/api/history/${user.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Lọc lịch sử: Chỉ lấy lịch sử của truyện đầu tiên và chapter gần nhất
                if (res.data.length > 0) {
                    // Nhóm lịch sử theo storyId
                    const groupedByStory = res.data.reduce((acc, item) => {
                        const storyId = item.storyId;
                        if (!acc[storyId]) {
                            acc[storyId] = [];
                        }
                        acc[storyId].push(item);
                        return acc;
                    }, {});

                    // Lấy chapter gần nhất cho mỗi truyện
                    const latestChapters = Object.values(groupedByStory).map(storyHistory => {
                        return storyHistory.reduce((latest, current) => {
                            return new Date(latest.lastRead) > new Date(current.lastRead) ? latest : current;
                        }, storyHistory[0]);
                    });

                    setHistory(latestChapters); // Cập nhật state với danh sách chapter gần nhất
                } else {
                    setHistory([]);
                }
            } catch (err) {
                setError(`Lỗi khi tải lịch sử: ${err.response?.data?.message || err.message}`);
                toast({
                    title: 'Thất bại!',
                    message: `Lỗi tải lịch sử: ${err.response?.data?.message || err.message}`,
                    type: 'error',
                    duration: 3000,
                });
                console.error("Lỗi tải lịch sử:", err);
            }
        };
        fetchHistory();
    }, [user, token, navigate]);

    // Xử lý xóa lịch sử
    const handleDelete = async (chapterId, userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/history/${userId}/${chapterId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setHistory(history.filter(item => item.chapternum !== chapterId)); // Cập nhật state
            toast({
                title: 'Thành công!',
                message: 'Xóa lịch sử đọc thành công!',
                type: 'success',
                duration: 3000,
            });
        } catch (err) {
            toast({
                title: 'Thất bại!',
                message: `Lỗi khi xóa lịch sử: ${err.response?.data?.message || err.message}`,
                type: 'error',
                duration: 3000,
            });
            console.error("Lỗi khi xóa lịch sử:", err);
        }
    };

    if (error) {
        return (
            <div className="history-page">
                <h2>Lịch sử đọc</h2>
                <p>{error}</p>
                <button onClick={() => navigate('/')}>Quay lại</button>
            </div>
        );
    }

    if (!history.length) {
        return (
            <div className="history-page">
                <h2>Lịch sử đọc</h2>
                <p>Chưa có lịch sử đọc nào.</p>
            </div>
        );
    }

    return (
        <div className="history-page">
            <h2>Lịch sử đọc</h2>
            <ul className="history-list">
                {history.map((item, index) => (
                    <li key={index} className="history-item">
                        <span className='history-item-name'>
                            <Link to={`/story/${item.storyId}`} className="story-link">
                                {item.storyName}
                            </Link>
                        </span>
                        <span className='history-item-chapter'>
                            - Chương: <Link to={`/story/${item.storyId}/chapter/${item.chapternum}`} className="chapter-link">
                                {item.chapternum}
                            </Link>
                        </span>
                        <span className="time"> - Lúc: {new Date(item.lastRead).toLocaleString()}</span>
                        <button
                            className="delete-button"
                            onClick={() => handleDelete(item.chapternum, user.id)} // Giả sử chapternum là unique
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HistoryPage;