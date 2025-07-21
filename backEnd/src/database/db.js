require('dotenv').config()
const mongoose = require('mongoose');


exports.databseConnection=async()=>{

    try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("database connection successfully")
    } catch (error) {
        console.log("database connection problem",error)
    }

}
