const express = require('express')
const app = express()
const cors = require('cors')
const { db } = require('./config/mongoose')
app.use(cors({ origin: 'http://localhost:4000', credentials: true }))
app.use(express.json({ limit: '20mb' }))
app.use('/api', require('./routes/allpathroutes'));
app.listen(3000, db, () => console.log('listen'));