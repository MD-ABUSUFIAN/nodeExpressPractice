const {app}=require('./app')
const port=process.env.PORT
const{log}=require("console")
const {databseConnection}=require("./src/database/db")

databseConnection().then(()=>{
app.listen(` ${port || 5000} `,()=>{
    log(" server is running on http://localhost:", port)
})
}).catch((error)=>{
    console.log("database error",error);
    
})
