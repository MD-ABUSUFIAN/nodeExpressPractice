const blogModel=require('../model/blog.model')
const fs=require("fs")
const path=require('path')


// creatE BLOG 
exports.createBlog=async(req,res)=>{
    try {
        const{blogTitle,blogDescription,user}=req.body;
      console.log(req?.file?.orginalname)
       const blog=await new blogModel({
        blogTitle,blogDescription,
        user:user,
        image:`${process.env.HOSTURL}${process.env.port}/static/${req.file.originalname}`
       }).save()
       return res.status(200).json({
        msg:"blog create succesfully",
        data:blog
       })
    } catch (error) {
        return res.status(201).json({
            error:error,
            msg:"error from blog Controller"+ error
        })
      
    }
}

// GET ALL BLOGS 
exports.getAllBlogs=async(req,res)=>{
  
   try {
     const allBlogs=await blogModel.find({}).populate('user')
    if(allBlogs){
        return res.status(200).json({
            msg:"gets all blogs succesfully",
            blog:allBlogs
        })
    }
   } catch (error) {
    return res.status(201).json({
        msg:"can not find all gets blogs"+error
    })
   }
    
}

// GET SINGLE BLOGS 
exports.getSingleBlog= async(req,res)=>{
    try {
        const slug=req.params.id 
        const findBlog=await blogModel.findOne({slug:slug}).populate('user')
        console.log(findBlog)
        if(!findBlog){
            return res.status(404).json({
                msg:"blog not Found"
            })
        }
        
  return res.status(200).json({
            msg:"single blog successfuly findout",
            data:findBlog
        })
      
      
    } catch (error) {
         return res.status(404).json({
        msg:"can not find single gets blogs"+error
    })
    }
}

//blog update
exports.blogUpdate=async(req,res)=>{
    try {
        const {slug}=req.params;
        const findBlog=await blogModel.findOne({slug:slug})
        if(!findBlog){
           return res.status(401).json({
        msg:"blog not found"
    
         })
        }
        // update the database  
        if(req.file){
            const imagePath=findBlog.image.split('/')
            const targetPath=path.join('public','temp',imagePath[imagePath.length-1])
            fs.unlinkSync(targetPath)

            // upload the new image 
        findBlog.image=`${process.env.HOSTURL}/static/${req.file?.originalname}`
        }
        else{
            findBlog.image=findBlog.image
        }
        findBlog.blogTitle=req.body?.blogTitle ||findBlog.blogTitle;
        findBlog.blogDescription=req.body?.blogDescription ||findBlog.blogDescription;
        // findBlog.image=req.file?.image ||findBlog.image;
        await findBlog.save()
        return res.status(200).json({
            msg: "blog update successfully",
            data:findBlog

        })
    } catch (error) {
         return res.status(500).json({
        msg:"can not find update blogs"+error,
        error:error.message
         })
}}

// blog delete 
exports.blogDelete=async(req,res)=>{
    try {
        const {slug}=req.params
        const findBlog=await blogModel.findOneAndDelete({slug:slug})
        console.log(findBlog)
        if(findBlog?.image){
            const imagePath=findBlog.image.split('/')
            const targetPath=path.join('public','temp',imagePath[imagePath.length-1])
            fs.unlinkSync(targetPath)
            return res.status(200).json({
                msg: "blog delete successfully",
                data:findBlog
            })
        }
        else{
            return res.status(404).json({
                msg: "blog not found"
            })
        }
    } catch (error) {
      return res.status(201).json({
        msg: "error from delete controller",error
      })  
    }
}