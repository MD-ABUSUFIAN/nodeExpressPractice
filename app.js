require('dotenv').config()
const express=require("express")
const app=express();
const userController=require("./src/controller/user.controller")
const categoryController=require("./src/controller/category.controller")
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
module.exports={app}