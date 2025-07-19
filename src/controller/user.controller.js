const userModel=require("../model/user.model")
const {checker}=require("../helpers/bodyValidation")

exports.registration=async(req,res)=>{
    const {userName,userEmail,userPhone,userPassword}=req.body; 
  try {
      // validation 
    if(!userName){
        return res.status(404).json({
            msg:"user Name is Missing"  
        })
    }
    if(!userPassword){
        return res.status(404).json({
            msg:"user pASSWORD is Missing"  
        })
    }
    if(!userPhone){
        return res.status(404).json({
            msg:"user phone number is Missing"  
        })
    }
    // databse save this data 
    userModel.create({
        userName:userName,
        userEmail:userEmail,
        userPassword:userPassword,
        userPhone:userPhone 
    })
    return res.status(201).json({
        msg:"database create successfully"
    })
  } catch (error) {
    console.log("error from registration controller",error)
  }
    
}
exports.login=async(req,res)=>{
    try {
        const{missing,fieldName}=checker(req)
     if(missing){
        return res.status(401).json({
            msg:`${fieldName} missing`
        })
     }
 const findUser=await userModel.findOne({userEmail:req.body.userEmail})

    //  return
 if(findUser.userEmail==req.body.userEmail && findUser.userPassword==req.body.userPassword){
    findUser.userPhone="01722123801"
    await findUser.save()
    return res.status(200).json({
        msg:"user login successfully"
    })
  
 }
else{
    res.status(200).json({
        msg:"email or password wrong"
    })
}
 }
  catch (error) {
        console.log("errror from login controoller",error);
        
    }
}
