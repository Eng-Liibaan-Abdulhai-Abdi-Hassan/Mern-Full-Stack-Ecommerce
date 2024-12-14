const mongoose = require('mongoose')
exports.db = mongoose.connect('mongodb+srv://Liban:m1cWwOs36RS1Lbqg@cluster0.dlnm9.mongodb.net/Mern-Full-Stack-Ecommerce?retryWrites=true&w=majority&appName=Cluster0')
console.log('Successfully Connected mongodb database')