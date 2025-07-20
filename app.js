require('dotenv').config()
const express=require("express")
const app=express();
const userController=require("./src/controller/user.controller")
const categoryController=require("./src/controller/category.controller")
const blogController=require("./src/controller/blog.controller")
const {upload}=require('./src/middlware/multer.middleware')
const path = require('path')

// middle ware 

app.use(express.json())
app.use(express.urlencoded({extended:true}))


// app.get('/hi',(req,res)=>{
//     res.send({
//         msg:"hello",
//         status:"ok",
//         statusCode:200
//     })
// })
app.post('/registration',userController.registration)
app.post('/login',userController.login)
app.post('/post',categoryController.categoryPost)
app.get('/allcategory',categoryController.allcategoryGet)
app.get('/category/:id',categoryController.singlecategory)

// blog 
app.post('/createBlog',upload.single('image'),blogController.createBlog)
app.get('/getAllBlog',blogController.getAllBlogs)
app.get('/singleBlog/:id',blogController.getSingleBlog)


app.use('/static', express.static(path.join("Public/temp")))

module.exports={app}