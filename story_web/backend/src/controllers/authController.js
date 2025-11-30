const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

exports.Register = catchAsync(async (req, res, next) => {
    const { username, email, password } = req.body
    console.log("Register data:", req.body)

    const exitingUser = await User.findOne({ where: { email } })
    if (exitingUser) {
        return next(new AppError("Email đã tồn tại", 400));
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    await User.create({
        username,
        email,
        password: hashedPassword,
    })

    return res.status(201).json({ message: "Đăng ký thành công" })
});

exports.Login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    console.log("Login data:", req.body)

    const user = await User.findOne({ where: { email } })
    if (!user) {
        return next(new AppError("Email không tồn tại", 400));
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return next(new AppError("Mật khẩu không đúng", 400));
    }
    const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
    }

    const secret = process.env.JWT_SECRET || 'secret'; // Fallback for dev, but should be in env
    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '1h' });
    console.log("Token:", token)
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' })
    return res.status(200).json({ message: "Đăng nhập thành công", user, userData, token })
});
