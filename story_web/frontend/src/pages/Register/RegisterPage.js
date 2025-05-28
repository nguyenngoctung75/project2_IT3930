import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterValidation from './RegisterValidation';
import axios from 'axios';
import './RegisterPage.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from '~/utils/toast-message'; // Import toast function if needed

const RegisterPage = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });

    const [showPassword, setShowPassword] = useState(false); // Trạng thái hiển thị mật khẩu
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (e) => {
        const { name, value, type, checked } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = RegisterValidation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0 && values.password === values.confirmPassword) {
            try {
                const res = await axios.post('http://localhost:5000/api/auth/register', {
                    username: values.name,
                    email: values.email,
                    password: values.password,
                });
                if (res.data.message === "Đăng ký thành công") {
                    toast({
                        title: "Thành công!",
                        message: res.data.message,
                        type: "success",
                        duration: 3000,
                    });
                    navigate('/login');
                } else {
                    toast({
                        title: "Cảnh báo!",
                        message: res.data.message,
                        type: "warning",
                        duration: 3000,
                    });
                    alert(res.data.message);
                }
            } catch (err) {
                toast({
                    title: "Thất bại!",
                    message: `Có lỗi xảy ra: ${
                        err.response?.data?.message || err.message
                    }`,
                    type: "error",
                    duration: 5000,
                });
                console.log(err);
            }
        } else {
            if (values.password !== values.confirmPassword) {
                alert('Mật khẩu và xác nhận mật khẩu không khớp.');
            }
            console.log("Form contains errors", validationErrors);
        }
    };

    return (
        <div className="register-page">
            <div className="register-box">
                <h2 className="register-heading">Đăng ký</h2>
                <form onSubmit={handleSubmit}>
                    <div className="register-input-group">
                        <label htmlFor="name" className="register-label">Tên:</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Nhập tên của bạn"
                            value={values.name} 
                            onChange={handleInput} 
                            required 
                            className="register-form-control rounded-0"
                        />
                        {errors.name && <span className="register-text-danger">{errors.name}</span>}
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="email" className="register-label">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Nhập email của bạn"
                            value={values.email} 
                            onChange={handleInput} 
                            required 
                            className="register-form-control rounded-0"
                        />
                        {errors.email && <span className="register-text-danger">{errors.email}</span>}
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="password" className="register-label">Mật khẩu:</label>
                        <div className="password-input-wrapper">
                            <input 
                                type={showPassword ? 'text' : 'password'} // Thay đổi type dựa trên trạng thái
                                id="password" 
                                name="password" 
                                placeholder="Mật khẩu có ít nhất 6 ký tự"
                                value={values.password} 
                                onChange={handleInput} 
                                required 
                                className="register-form-control rounded-0"
                            />
                            <FontAwesomeIcon 
                                icon={showPassword ? faEyeSlash : faEye} 
                                className="password-toggle-icon"
                                onClick={togglePasswordVisibility}
                            />
                        </div>
                        {errors.password && <span className="register-text-danger">{errors.password}</span>}
                    </div>
                    <div className="register-input-group">
                        <label htmlFor="confirmPassword" className="register-label">Nhập lại mật khẩu:</label>
                        <div className="password-input-wrapper">
                            <input 
                                type={showConfirmPassword ? 'text' : 'password'} // Thay đổi type dựa trên trạng thái
                                id="confirmPassword" 
                                name="confirmPassword" 
                                placeholder="Nhập lại mật khẩu"
                                value={values.confirmPassword} 
                                onChange={handleInput} 
                                required 
                                className="register-form-control rounded-0"
                            />
                            <FontAwesomeIcon 
                                icon={showConfirmPassword ? faEyeSlash : faEye} 
                                className="password-toggle-icon"
                                onClick={toggleConfirmPasswordVisibility}
                            />
                        </div>
                        {errors.confirmPassword && <span className="register-text-danger">{errors.confirmPassword}</span>}
                    </div>
                    <div className="register-terms">
                        <input 
                            type="checkbox" 
                            id="terms" 
                            name="termsAccepted"
                            checked={values.termsAccepted} 
                            onChange={handleInput} 
                        />
                        <label htmlFor="terms" className="register-label">Tôi đồng ý với chính sách về quyền riêng tư và điều khoản dịch vụ</label>
                    </div>
                    <button 
                        type="submit" 
                        className={`register-button ${values.termsAccepted ? 'active' : 'disabled'}`} 
                        disabled={!values.termsAccepted}
                    >
                        Đăng ký
                    </button>
                </form>
                <div className="register-links">
                    <p>Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;