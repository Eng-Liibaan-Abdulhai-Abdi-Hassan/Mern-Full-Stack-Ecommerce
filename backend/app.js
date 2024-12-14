const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path');
const { db } = require('./config/mongoose')
app.use(cors({ origin: 'https://mern-full-stack-ecommerce.onrender.com', credentials: true }))
app.use(express.json({ limit: '20mb' }))
app.use('/api', require('./routes/allpathroutes'));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'))
})
app.listen(4000, db, () => console.log('listen'));