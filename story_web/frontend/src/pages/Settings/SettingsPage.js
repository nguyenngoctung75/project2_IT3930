import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '~/utils/AuthContext';
import { toast } from '~/utils/toast-message';
import './SettingsPage.scss';

function SettingsPage() {
    const { user, token } = useContext(AuthContext);
    const { userId } = useParams();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                // if (!user || user.id.toString() !== userId) {
                //     toast({
                //         title: 'Quyền truy cập bị từ chối!',
                //         message: 'Bạn chỉ có thể chỉnh sửa tài khoản của mình.',
                //         type: 'warning',
                //         duration: 3000,
                //     });
                //     navigate('/');
                //     return;
                // }

                const res = await axios.get(`http://localhost:5000/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUsername(res.data.username);
                setEmail(res.data.email);
                setAvatarPreview(res.data.avatar || ''); // URL của avatar hiện tại
            } catch (err) {
                toast({
                    title: 'Thất bại!',
                    message: `Lỗi khi tải thông tin: ${err.response?.data?.message || err.message}`,
                    type: 'error',
                    duration: 3000,
                });
            }
        };
        fetchUserData();
    }, [user, token, userId, navigate]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('email', email);
        if (avatar) {
            formData.append('avatar', avatar);
        }

        try {
            const res = await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Cập nhật lại localStorage nếu thông tin user thay đổi
            localStorage.setItem('user', JSON.stringify(res.data.user));
            toast({
                title: 'Thành công!',
                message: 'Cập nhật tài khoản thành công!',
                type: 'success',
                duration: 3000,
            });
        } catch (err) {
            toast({
                title: 'Thất bại!',
                message: `Lỗi khi cập nhật: ${err.response?.data?.message || err.message}`,
                type: 'error',
                duration: 3000,
            });
        }
    };

    return (
        <div className="setting-page">
            <h2>Cài đặt tài khoản</h2>
            <form onSubmit={handleSubmit} className="setting-form">
                <div className="form-group">
                    <label htmlFor="username">Tên tài khoản</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        readOnly // Email chỉ để xem, không cho chỉnh sửa
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="avatar">Ảnh đại diện</label>
                    {avatarPreview && (
                        <img src={avatarPreview} alt="Avatar Preview" className="avatar-preview" />
                    )}
                    <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        onChange={handleAvatarChange}
                    />
                </div>
                <button type="submit" className="submit-button">
                    Lưu thay đổi
                </button>
            </form>
        </div>
    );
}

export default SettingsPage;