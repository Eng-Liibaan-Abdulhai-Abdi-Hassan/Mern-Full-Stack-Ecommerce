const jwt = require('jsonwebtoken')
const AddCartProtocol = (req, res, next) => {
    let token = req.headers.cookie && req.headers.cookie.split('=')[1]
    if (!token) return res.send("Please Login In")
    jwt.verify(token, 'token', (err, user) => {
        if (err) return res.send('invalid token')
        req.user = user
        next()
    })


}

module.exports = AddCartProtocol
