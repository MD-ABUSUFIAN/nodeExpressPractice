const userModel=require("../model/user.model")
const {checker}=require("../helpers/bodyValidation")

exports.registration=async(req,res)=>{
    const {userName,userEmail,userPassword,address}=req.body; 
  try {
      // validation 
    if(!userName){
        return res.status(404).json({
            msg:"user Name is Missing"  
        })
    }
    if(!userEmail){
        return res.status(404).json({
            msg:"user Email is Missing"  
        })
    }
    if(!userPassword){
        return res.status(404).json({
            msg:"user pASSWORD is Missing"  
        })
    }
    if(!address){
        return res.status(404).json({
            msg:"user address is Missing"  
        })
    }
    // databse save this data 
    userModel.create({
        userName:userName,
        userEmail:userEmail,
        userPassword:userPassword,
        address:address 
    })
    return res.status(201).json({
        msg:"database create successfully"
    })
  } catch (error) {
    console.log("error from registration controller",error)
  }
    
}

// login 
exports.login=async(req,res)=>{
    try {
        const{missing,fieldName}=checker(req)
     if(missing){
        return res.status(401).json({
            msg:`${fieldName} missing`
        })
     }
 const findUser= await userModel.findOne({userEmail:req?.body?.userEmail})

    //  return
 if(findUser?.userEmail==req?.body?.userEmail && findUser?.userPassword==req?.body?.userPassword){
    // findUser.userPhone="01722123801"
    await findUser.save()
    return res.status(200).json({
        msg:"user login successfully",
        data:findUser
    })
  
 }
else{
    res.status(201).json({
        msg:"email or password wrong"
    })
}
 }
  catch (error) {
        console.log("errror from login controoller",error);
        
    }
}
