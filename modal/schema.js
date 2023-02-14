const mongoose = require("mongoose");
const schema = mongoose.Schema;

let productDetails = new schema({
    userEmail : {
        type:String,
        required:true
    },

    productStatus:{
     type:String,
     required:true
    },

    productTable:{
        type:Array,
        required:true
    },
    date:{
     type:String,
    }
})

let user = new schema({
   userName : {
        type:String,
        required:true
   },
   userEmail : {
        type:String,
        required:true,
   } ,
   company : {
     type:String,
     required:true
   },
   planName : {
        type:String,
        required:true
   },
   skus:{
        type:Number,
        required:true
   },
   password:{
        type:String,
        require:false,
        default:""
   },
   Status:{
     type:Boolean,
     required:false,
     default:false
   },
   productStatus:{
     type:String,
     require:true,
     default:"Incomplete"
   },
   subscription:{
     type:Boolean,
     required:true
   }
})

let blog = new schema({
     title:{
          type:String,
          required:true
     },
     content :{
          type:String,
          required:true
     },
     image:{
          type:String,
          required:true
     }
})

const products = mongoose.model('productDetail',productDetails);
const users = mongoose.model('user',user);
const blogs = mongoose.model('blog',blog)

module.exports = {
    products,
    users,
    blogs
}