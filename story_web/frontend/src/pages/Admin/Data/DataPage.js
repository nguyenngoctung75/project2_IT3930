import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '~/utils/AuthContext';
import { toast } from '~/utils/toast-message';
import './DataPage.scss';

function DataPage() {
    const navigate = useNavigate();
    const { user, token } = useContext(AuthContext);
    const [stats, setStats] = useState({ storyCount: 0, chapterCount: 0 });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // if (!user || user.role !== 'admin') {
                //     toast({
                //         title: 'Quyền truy cập bị từ chối!',
                //         message: 'Chỉ admin mới có thể truy cập trang này.',
                //         type: 'warning',
                //         duration: 3000,
                //     });
                //     navigate('/');
                //     return;
                // }

                const [statsRes, usersRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/users/stats', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get('http://localhost:5000/api/users', {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setStats(statsRes.data);
                setUsers(usersRes.data);
            } catch (err) {
                setError(`Lỗi khi tải dữ liệu: ${err.response?.data?.message || err.message}`);
                toast({
                    title: 'Thất bại!',
                    message: `Lỗi tải dữ liệu: ${err.response?.data?.message || err.message}`,
                    type: 'error',
                    duration: 3000,
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [user, token, navigate]);

    const handleUpdateRole = async (userId, newRole) => {
        try {
            const res = await axios.put(
                `http://localhost:5000/api/users/${userId}/role`,
                { role: newRole },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setUsers(users.map(u => (u.id === userId ? res.data : u)));
            toast({
                title: 'Thành công!',
                message: `Cập nhật quyền thành công cho người dùng ${res.data.username}!`,
                type: 'success',
                duration: 3000,
            });
        } catch (err) {
            toast({
                title: 'Thất bại!',
                message: `Lỗi khi cập nhật quyền: ${err.response?.data?.message || err.message}`,
                type: 'error',
                duration: 3000,
            });
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(users.filter(u => u.id !== userId));
            toast({
                title: 'Thành công!',
                message: 'Xóa người dùng thành công!',
                type: 'success',
                duration: 3000,
            });
        } catch (err) {
            toast({
                title: 'Thất bại!',
                message: `Lỗi khi xóa người dùng: ${err.response?.data?.message || err.message}`,
                type: 'error',
                duration: 3000,
            });
        }
    };

    if (loading) return <div>Đang tải dữ liệu...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="data-page">
            <h2>Thống kê dữ liệu</h2>
            <div className="stats">
                <div className="stat-item">
                    <h3>Số lượng truyện</h3>
                    <p>{stats.storyCount}</p>
                </div>
                <div className="stat-item">
                    <h3>Số lượng chapter</h3>
                    <p>{stats.chapterCount}</p>
                </div>
            </div>
            <h3>Danh sách người dùng</h3>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên tài khoản</th>
                        <th>Email</th>
                        <th>Quyền</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>
                                <select
                                    value={user.role}
                                    onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                                    disabled={user.role === 'admin'} // Không cho phép thay đổi quyền admin
                                >
                                    <option value="user">User</option>
                                    <option value="author">Author</option>
                                    {user.role === 'admin' && <option value="admin">Admin</option>}
                                </select>
                            </td>
                            <td>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteUser(user.id)}
                                    disabled={user.role === 'admin'} // Không cho phép xóa admin
                                >
                                    Xóa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DataPage;