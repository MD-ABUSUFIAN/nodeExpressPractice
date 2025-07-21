const categoryModel=require('../model/category.model')
// const {checker}=require("../controller/category.controller")
exports.categoryPost=async(req,res)=>{
    const {categoryName,categoryDescription,isActive}=req.body; 
  console.log(req.body)
try {
       if(!categoryName){
        return res.status(404).json({
            msg:`${categoryName} name is Missing` 
        })
    }
       if(!categoryDescription){
        return res.status(404).json({
            msg:`${categoryDescription} is Missing` 
        })
    }
    const isExist=await categoryModel.findOne({categoryName:req.body.categoryName})
    if(isExist){
        return res.status(401).json({
            msg:`${isExist.categoryName} is already exist plz try again`
        })
    }
    // save database 
    const saveCategory=await new categoryModel({
            categoryName:categoryName,
            categoryDescription:categoryDescription,
            isActive:isActive
        }

    ).save()
if(!saveCategory){
return res.status(401).json({
        msg:"faild to create category"
    })  
    return res.status(201).json({
        msg:"create a successfully"
    }) 
}
         
  
 
//     else{
//  const{missing,fieldName}=checker(req)
//  if(missing){
//         return res.status(401).json({
//             msg:`${fieldName} missing`
//         })
//      }
//     }
   

} 
catch (error) {
    return res.status(401).json({
        msg:"database faield plz try agin post"
    })
}
}
exports.allcategoryGet=async(req,res)=>{
try {
    const allCategory= await categoryModel.find({})
    console.log(allCategory)
    
} catch (error) {
    console.log("error from all category controller",error)
}
}
exports.singlecategory=async(req,res)=>{
try {
    const id=req.params.id
    const singleCategory= await categoryModel.findOne({_id:id})
    console.log(singleCategory)
    
} catch (error) {
    console.log("error from all category controller",error)
}
}