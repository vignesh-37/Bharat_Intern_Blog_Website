const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title:String,
    shortnotes:String,
    content:String
})
 
 const blog= mongoose.model('Blog',blogSchema)
 module.exports =blog