const mongoose = require("mongoose");
require('dotenv').config()
mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
.then(()=>{
    console.log("Data Base connection successfull");
})
.catch(()=>{
    console.log("Data Base connection lost !! Something went wrong");
})