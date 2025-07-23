require('dotenv').config()
const express=require("express")
const app=express();
const path = require('path')
const cors = require('cors')
const userController=require("./src/controller/user.controller")
const categoryController=require("./src/controller/category.controller")
const blogController=require("./src/controller/blog.controller")
const {upload}=require('./src/middlware/multer.middleware')


// middle ware 
app.use(cors({
    origin:["http://localhost:5173"]
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.post('/registration',userController.registration)
app.post('/login',userController.login)
app.post('/post',categoryController.categoryPost)
app.get('/allcategory',categoryController.allcategoryGet)
app.get('/category/:id',categoryController.singlecategory)

// blog 
app.post('/createBlog',upload.single('image'),blogController.createBlog)
app.get('/getAllBlog',blogController.getAllBlogs)
app.get('/singleBlog/:id',blogController.getSingleBlog)
app.put('/updateBlog/:slug',upload.single('image'),blogController.blogUpdate)
app.delete('/deleteBlog/:slug',blogController.blogDelete)

app.use('/static', express.static(path.join("Public/temp")))

module.exports={app}