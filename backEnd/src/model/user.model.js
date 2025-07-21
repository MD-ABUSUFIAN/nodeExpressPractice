const mongoose=require("mongoose");
const { Schema } = mongoose;

const userSchema=new Schema({
userName:{
    type:String,
    required:true,
    trim:true,
    unique:true,
    // min:[5, "Minumam 5 Chreacter"],
    // max:[20, "Maxumam 20 Chreacter"]
},
userEmail:{
    type:String,
    required:true,
    trim:true,
    unique:true
},
userPassword:{
    type:String,
    required:true,
    trim:true
},
address:{
    type:String,
    trim:true
}
})

// Model
module.exports=mongoose.model('user',userSchema)