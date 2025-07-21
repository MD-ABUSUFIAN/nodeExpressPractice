const blogModel=require('../model/blog.model')


// creatE BLOG 
exports.createBlog=async(req,res)=>{
    try {
        const{blogTitle,blogDescription,user}=req.body;
      console.log(req.file.originalname)
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
        const findBlog=await blogModel.find({slug:slug}).populate('user')
        console.log(findBlog)
        if(!findBlog){
            return res.status(404).json({
                msg:"blog not Found"
            })
        }
        
  return res.status(201).json({
            msg:"single blog successfuly findout",
            data:findBlog
        })
      
      
    } catch (error) {
         return res.status(201).json({
        msg:"can not find single gets blogs"+error
    })
    }
}