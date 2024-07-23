const express = require ('express')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const {fileURLToPath} = require('url')
const {dirname} = require('path')
const dotenv = require('dotenv')
const addBlogs = require('./model/blog')
const methodOverride  = require('method-override')


const app = express() //the object 'app' created for instance of express

dotenv.config()
const PORT = process.env.PORT || 3030;
const mongoURI = process.env.mongoConnect;

//in-build middleware of frontend and backend
app.use(express.urlencoded({extended:false}))
app.use(express.json())

// Serve static files from the "public" directory
app.use(express.static( 'public'));

app.set('view engine', 'ejs')
app.use(methodOverride('_method'))

//connect to the database
mongoose.connect(mongoURI)
const db=mongoose.connection
db.on('error',console.log.bind(console,'Connection Error'))
db.once('open',function(callback){
    console.log(' Database Connected Successfully')
})


//add a new blogs in to the database
app.post('/blogAddForm',async (req,res)=>{
    try{
        const blogTitle = req.body.blogTitle
        const shortNotes=req.body.shortNotes
        const content = req.body.blogContent
       const data =await addBlogs.create({title:blogTitle,shortnotes:shortNotes,content:content})
       res.status(200).redirect('/')
    }
    catch(err){
        res.status(500).send("Error of add new blogs")
    }
    
})


// delete a blog section
app.delete('/blogs/:id', async (req, res) => {
    try {
        await addBlogs.findByIdAndDelete(req.params.id); //find the blog id and delete the collection
        res.redirect('/'); // Redirect to home or any other page after deletion
    } catch (error) {
        res.status(500).send('Error deleting blog');
    }
});

//serve the index file
app.get('/',async(req,res)=>{
    try{
        const blogs = await addBlogs.find()
        res.render('blog_index',{blogs: blogs})
    }
    catch(err){
        res.status(500)
    }
    
})

app.listen(PORT,()=>{console.log(`server runs http://localhost:${PORT}`)})
