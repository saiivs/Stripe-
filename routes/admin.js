const express = require('express');
const router = express.Router();
const database = require('../controls/dbQuery')
require('dotenv').config()



// admin credentials
let admin={
  email:process.env.ADMIN_EMAIL,
  password:process.env.ADMIN_PASSWORD
}

function checkSession(req,res,next){
  if(req.session.adminLogin){
    res.redirect("/admin/users")
  }else{
    next()
  }
}

function afterLogOut(req,res,next){
  if(req.session.adminLogin){
    next()
  }else{
    res.redirect("/admin")
  }
}

/* GET admin login. */
router.get("/",checkSession,(req,res)=>{
  try{
    res.render('adminLogin',{Err:req.session.adminError,otherPages:true,pageTitle:"Admin - "})
    req.session.adminError = false;
  }catch(error){

  }
  
})

router.get("/users",afterLogOut,async(req,res)=>{
  try{
    let users = await database.getUsers()
    let notFound = false;
    if(!users){
      notFound = "No users to view"
    }
    res.render('adminUser',{users,notFound,otherPages:true,pageTitle:"Admin Area - "})
  }catch(error){

  }
  
})

router.post('/adminCheck',(req,res)=>{
  try{
    let {email,password} = req.body;
    console.log(req.body);
    let verify = email == admin.email && password == admin.password ? true : false;
    console.log(verify);
    if(verify){
      req.session.adminLogin = true;
      res.redirect('/admin/users')
    }else{
      req.session.adminError = "*Invalid Email or Password";
      res.redirect("/admin")
    }
  }catch(error){

  }
  
})

router.get("/product/Get/:email",afterLogOut,async(req,res,next)=>{
  try{
    let emailId = req.params.email
    let table = await database.getProTable(emailId);
    let {userName} = await database.getUser(emailId);
    let data;
    let notFound = false;
    if(table){
      data = table.productTable;
    }else{
      notFound = "No data to view"
    }
    res.render('adminProduct',{data,userName,notFound,otherPages:true,pageTitle:"Admin - Products View - "})
    
  }catch(error){
    console.log("admin error");
    next(error)
  }
})

router.get('/cancelSubscription/:id',async(req,res)=>{
  try{
  let userId = req.params.id;
  await database.cancelSub(userId);
  res.json()
  }catch(error){
    next(error)
  }
  
})

router.get("/LogOut",(req,res)=>{
  try{
    req.session.adminLogin = false
    res.redirect("/admin")
  }catch(error){

  } 
})

module.exports = router;
