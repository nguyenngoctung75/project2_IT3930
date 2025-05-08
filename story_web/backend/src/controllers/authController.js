const { User } = require('../models');
const bcrypt = require('bcrypt');

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