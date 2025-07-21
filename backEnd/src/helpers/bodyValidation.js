exports.checker=(req)=>{
   // const{email,password}=req.body;
       if(req){
         for(const field in req.body){
            if(req.body[field]===""){
                return {missing:true,fieldName:field}
            }
            }
            return false
       }
}