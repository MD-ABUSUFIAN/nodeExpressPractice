const mongoose=require("mongoose")
const { Schema } = mongoose


const blogSchema= new Schema({
slug:{
type:String
},
 blogTitle:{
    type:String,
    required:true,
    trim:true
 },
  blogDescription:{
    type:String,
    required:true,
    trim:true
 },
  image:{
    type:String
 }
 ,user:{
    type:mongoose.Types.ObjectId,
    ref:"user"
 }



},{timestamps:true})

blogSchema.pre('save',function(next){
    if(this.isModified('blogTitle')){
 const trimTitle=this.blogTitle.replaceAll(' ', '-').toLowerCase()
    this.slug=trimTitle
    next()
    }
   next()
})

module.exports=mongoose.model("blog",blogSchema)