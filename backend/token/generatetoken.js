const jwt = require('jsonwebtoken')
const generatetoken = (user, res) => {
    let token = jwt.sign({ id: user._id }, 'token', { expiresIn: '2d' })
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        SameSite: true,
        expires: new Date('2025/4/2')
    }
    res.cookie('token', token, cookieOptions)
}
module.exports = generatetoken