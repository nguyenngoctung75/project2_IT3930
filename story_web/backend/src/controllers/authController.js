const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.Register = async (req, res) => {
    const { username, email, password } = req.body
    console.log("Register data:", req.body)

    try {
        const exitingUser = await User.findOne({ where: { email } })
        if (exitingUser) {
            return res.status(400).json({ message: "Email đã tồn tại" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        
        await User.create({
            username,
            email,
            password: hashedPassword,
        })

        return res.status(201).json({ message: "Đăng ký thành công" })
    } catch (error) {
        console.error('Lỗi khi đăng ký:', error)
        return res.status(500).json({ message: "Lỗi server, vui lòng thử lại sau." })
    }
}

exports.Login = async (req, res) => {
    const  { email, password } = req.body 
    console.log("Login data:", req.body)

    try {
        const user = await User.findOne({ where: { email }})
        if (!user) {
            return res.status(400).json({ message: "Email không tồn tại" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Mật khẩu không đúng" })
        }
        const userData = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        }
        // const token = user.generateAuthToken()
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        console.log("Token:", token)
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'Strict' })
        return res.status(200).json({ message: "Đăng nhập thành công", user, userData, token })
    } catch (e) {
        console.error('Lỗi khi đăng nhập:', e)
        return res.status(500).json({ message: "Lỗi server, vui lòng thử lại sau." })
    }
}