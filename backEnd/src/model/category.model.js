const mongoose=require("mongoose")
const { Schema } = mongoose


const categorySchema=new Schema({
categoryName:{
    type:String,
    trim:true,
    required:true
},
categoryDescription:{
    type:String,
    trim:true,
    required:true
},
isActive:{
    type:Boolean,
    trim:true,
    // required:true,
    default:false
}
},{timestamps:true}
)

module.exports=mongoose.model('category',categorySchema)