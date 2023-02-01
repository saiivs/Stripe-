
let express = require('express');
let router = express.Router();
var path = require('path');
require('dotenv').config()
const url = require('url')
const stripe = require('stripe')(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require('uuid');
const nodemailer = require('nodemailer');
const database = require('../controls/dbQuery');
const emailHbs = require("nodemailer-express-handlebars")
let transporter = nodemailer.createTransport({
  service:"Gmail",
  port: 587,
  secure: false, // true for 465, false for other ports 
  auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASSWORD,   
  },
  tls:{rejectUnauthorized:false}  
});

let transporterAdmin = nodemailer.createTransport({
  service:"Gmail",
  port: 587,
  secure: false, // true for 465, false for other ports 
  auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASSWORD,   
  },
  tls:{rejectUnauthorized:false}  
});

let options = {
  viewEngine : {  
    extName : ".handlebars",  
    partialsDir: path.resolve('./views'),
    defaultLayout: false,
  },
  viewPath: path.resolve('./views'),
  extName:".handlebars"
}
transporter.use("compile",emailHbs(options))

//middleware for clientArea
function client(req,res,next){
  if(req.session.currentUser){
    let userName = req.session.currentUser.userName;
    req.user = userName;
    next()
  }else{
    req.user = "Client";
    next()
  }
}

function checkLogout(req,res,next){
  if(req.session.userLogin){
    req.Btn = true;
    next()
  }else{
    req.Btn = false;
    next()
  }
}
// for chechking the subscription
function checkSubscription(req,res,next){
  if(req.session.subscription){
    res.redirect("/success")
  }else{
    next()
  }
}

function userSession(req,res,next){
  if(req.session.userLogin){
    res.redirect("/clientArea")
  }else{
    next()
  }
}

function logoutSession(req,res,next){
  if(!req.session.userLogin) {res.redirect('/ClientArea/login');}
  else {next()}
}

async function preventSuccess  (req,res,next){
  let email = req.session.address.email;
  let userExist = await database.checkUser(email);
  if(userExist){
    res.redirect('/pricing')
  }else{ 
    next()
  } 
}


// plandata
const plans =[
  { 
    id:'0',
    planName:"Free",
    amount:0
  },
  {
    id:'1',
    planName:"Annual Subscription",
    planMethod:"annually",
    amount:process.env.ANNUALLY_AMOUNT,
    priceId:process.env.ANNUALLY_PRICE_ID
  },
  {
    id:'2',
    planName:"Monthly Subscription",
    planMethod:"monthly",
    amount:process.env.MONTHLY_AMOUNT,
    priceId:process.env.MONTHLY_PRICE_ID
  }
]

router.get("/",client,checkLogout,(req,res,next)=>{
  try{
    let name =req.user
    let logout = req.Btn
    res.render('index',{name,indexHead:true,nav:true,active1:true,active2:false,active3:false,active4:false,logout,otherPages:false,indexNav:true})
    indexNav = false;
    indexHead = false;
  }catch(error){
    console.log(error);
    next(error)
  }  
})
  
/* GET pricing page. */
router.get('/pricing',checkSubscription,client,checkLogout, function(req, res, next) { 
  try{ 
    let name = req.user  
    let logout = req.Btn 
    res.render('pricing',{name,nav:true,foo:true,active1:false,active2:true,active3:false,active4:false,logout,otherPages:true,pageTitle:"Pricing -"});
  }catch(error){
    console.log(error);
    next(error)
  }
});

router.get('/pricingFaq',client,checkLogout,(req,res,next)=>{
  try{
    let faq = "faq"
    let name = req.user
    let logout = req.Btn
    res.render('pricing',{faq,name,nav:true,foo:true,active1:true,active2:false,active3:false,active4:false,logout,otherPages:true,pageTitle:"Pricing -"});
  }catch(error){
    next(error) 
  }
})

router.get("/businessCases",client,checkLogout,(req,res,next)=>{
  try{
    let name = req.user
    let logout = req.Btn
    res.render('business_cases',{name,nav:true,foo:true,active1:false,active2:false,active3:true,active4:false,logout,otherPages:true,pageTitle:"Business Cases -"});
  }catch(error){
    next(error)
  }
})

router.get("/contactUs",client,checkLogout,(req,res,next)=>{
  try{
    let name = req.user;
    let logout = req.Btn
    res.render('contact_us',{name,nav:true,foo:true,active1:false,active2:false,active3:false,active4:true,logout,otherPages:true,pageTitle:"Contact Us - "});
  }catch(error){
    next(error)
  }
})

router.get("/policy",client,checkLogout,(req,res,next)=>{
  try{
  let name = req.user
  let logout = req.Btn
  res.render("privacy_policy",{name,nav:true,foo:true,logout,otherPages:true,pageTitle:"Privacy Policy - "})
  }catch(error){
    next(error)
  }
 
})

router.get("/termsCondition",client,checkLogout,(req,res,next)=>{
  try{
    let name = req.user;
    let logout = req.Btn
    res.render('terms_and_conditions',{name,nav:true,foo:true,logout,otherPages:true,pageTitle:"Terms and Conditions - "})
  }catch(error){
    next(error)
  }

})

router.post("/contactDetails",async(req,res,next)=>{
  try{
    let {email,name,country,phone,businessName,role} = req.body;

  // send mail with defined transport object
    let demo = await transporterAdmin.sendMail({
      from: `"${name}" <no-reply@charpstar.com>`, // sender address
      to: "emil@charpstar.com,victor@charpstar.com,arjun@charpstar.com", // list of receivers
      subject: "Demo Request", // Subject line 
      text: `Name : ${name} \nEmail : ${email} \nCountry : ${country} \nPhone : ${phone} \nBusiness : ${businessName} \nRole : ${role}`,
});

if(demo){
  res.json(true)
}
  }catch(error){
    console.log(error);
    next(error)
  }
  

})

router.post('/plan/Get',(req,res,next)=>{
  try{
  let {planId,quantity} = req.body
  let plan = plans.find(item =>item.id == planId);
  plan.quantity = quantity
  req.session.planData = plan;
  req.session.valid = true; 
  res.json({status:true})
  }
  catch(error){
   console.log(error);
   next(error)
  } 
})

router.get('/payment',client,checkLogout,(req,res,next)=>{
  try{
    let plan = req.session.planData;
    if(req.session.valid){
      let quantity = parseInt(plan.quantity);
      let price = plan.amount;
      let duration = "month"
      price = quantity * price;
      if(plan.planName == "Annual Plan"){ 
        price = price * 12
        duration = "year"
      }
      let planData = {
        name:plan.planName,
        amount:`$${price} per ${duration}, billed ${plan.planMethod}`,
        quantity:quantity
      }
      let name = req.user
      let logout = req.Btn
      res.render('customForm',{planData,name,nav:true,logout,otherPages:true,pageTitle:"Payment -"})
    }else{
      res.redirect('/pricing')
    }   
  }
  catch(error){
    next(error)
  }
  
})

router.get('/public_key',(req,res,next)=>{
  try{
  res.json({public_key:process.env.STRIPE_PUBLIC_KEY})
  }
  catch(error){
    next(error) 
  } 
})

// customer creation in stripe
router.post('/createCustomer',async(req,res,next)=>{
  try{
  let address = req.body
  let userExist = await database.checkUser(address.email)
  if(!userExist){
 let plan = plans.filter(item => item.planName == address.planName);
  req.session.address = address
  req.session.skus = address.skus
  let checkCustomer = await stripe.customers.search({
    query: `email:\'${address.email}\'`,
  })
  if(checkCustomer.data[0]){
    req.session.customer_id = checkCustomer.data[0].id;
  }else{
    const customer = await stripe.customers.create({
    name: address.name,
    email:address.email,
    address: {
      line1: address.line1,
      postal_code: address.postalCode,
      city: address.city,
      state: address.state,
      country: address.country,
    }, 
  },{
    idempotencyKey: uuidv4()
  })
  if(!customer){
    throw new Error("Something went wrong! Server is not responding")
  }
  req.session.customer_id = customer.id;
  }
  
  // subscription////
  const subscription = await stripe.subscriptions.create({
    customer:  req.session.customer_id,
    items: [{
      price: plan[0].priceId,
      quantity:address.skus
    }],
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent'],
  },{
    idempotencyKey: uuidv4()
  });
  if(!subscription) throw new Error("Something went wrong! Server is not responding")
  console.log("completed");
  
  res.send({
    subscriptionId: subscription.id,
    clientSecret: subscription.latest_invoice.payment_intent.client_secret,
  });
  }else{
    res.send({userExist:true,email:address.email})
  }
 
  }
  catch(error){
    console.log(error);
    next(error)
  }
})

router.post('/googleSheets',async(req,res,next)=>{
try{
let userInfo = req.session.laterUser 
let arr = Object.entries(req.body);
let newArray = [];
arr.filter(items => newArray.push(items[1]));
let Arr1 =[];

 if(Array.isArray(newArray[0])){
  let subArr = newArray[0];
  let len2 = subArr.length;
   
  for (let i=0;i<len2;i++){
      let obj = {}
      if(newArray[0][i] != "" && newArray[1][i] != "" && newArray[2][i] != ""){
        obj.ArticleId = newArray[0][i];
        obj.ProductName = newArray[1][i];
        obj.ProductLink = newArray[2][i];
        Arr1.push(obj)
      }   
  }
 }else{
  finalArr = [...newArray]
  let obj = {}
  for(let index in finalArr){
      if(index == 0){
        obj.ArticleId = finalArr[index];
      }else if(index == 1){
        obj.ProductName = finalArr[index];
      }else{
        obj.ProductLink = finalArr[index];
      } 
  }
  Arr1.push(obj)
 }

let userEmail = userInfo.userEmail
let proData = await database.productDetails(Arr1,userEmail);
let status = true
if(!proData)
{
  status = false
}
res.json(status) 
// sending mail to victor
let transporter = nodemailer.createTransport({
  service:"Gmail",  
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASSWORD,   
  },
  tls:{rejectUnauthorized:false}
});

// send mail with defined transport object
let tableUpdation = await transporterAdmin.sendMail({
  from: '"Table Updation" <no-reply@charpstar.com>', // sender address
  to: "admin@charpstar.com", // list of receivers
  subject: "CharpstAR Table Updation", // Subject line 
  text:`${userInfo.userEmail} has updated the details of the product`,
  // attachments:[{ path: `public/csvFiles/${fileName}.csv`}]
});
// console.log("Message sent: %s", info.messageId);
// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}
catch(error){ 
  console.log(error);
  next(error)  
}  
})

router.get("/ClientArea/login",userSession,async(req,res,next)=>{
  try{
  let err = req.session.Error ? req.session.Error : false;
  res.render("userLogin",{err,otherPages:true,pageTitle:"User Login - "})
  
  req.session.Error = false; 
  }catch(error){
    console.log(error);
    next(error)
  }
   
}) 
 
router.get('/clientArea',logoutSession,async(req,res,next)=>{
  try{
          let userEmail = req.session.loginEmail
          let dataArr = [] 
          let obj = {
            ArtcicleId:"",
            ProductName:"",
            ProductLink:""
          }
          let user = await database.GetSkus(userEmail);
          let name = user.userName
          if(user.status == "complete"){
            dataArr = [...user.data.productTable]
          }else if(user.status == "incomplete"){
            dataArr = [...user.data]
          }else if(user.status == "newUser"){
            console.log("entered the new user");
            for(let i = 0;i<user.data.skus;i++){
              dataArr.push(obj)
            } 
          }else{
            throw new Error("User not found")
          }
          res.render('clientArea',{dataArr,name,nav:true,foo:true,logout:true,otherPages:true,pageTitle:"Client Area - "})
        
  }catch(error){
    console.log(error);
    next(error)
  }
}) 

router.post("/ClientArea/Get",async(req,res,next)=>{
  try{
      req.session.productSubmitted =false;
      let {userEmail,userPass} = req.body;
      req.session.laterUser = req.body 
      let userData = await database.getUserData(userEmail,userPass);
      console.log({userData});
      if(userData.status == "userNotExist"){

        req.session.Error = "*Wrong username or password" 
        res.redirect('/ClientArea/login')
        
      }
      else if(userData.status){
        req.session.loginEmail = req.body.userEmail
        let user = await database.getUser(req.body.userEmail)
        req.session.currentUser = user
        req.session.userLogin = true;
        res.redirect("/clientArea")
      }
      else{

        req.session.Error = "*Invalid Password or Email ID"
        res.redirect('/ClientArea/login')

      }
  }catch(error){
    console.log(error);
    next(error)
  }
})

router.get('/subscriptionTrue',(req,res)=>{
  req.session.subscription = true; 
  res.json(true)  
})
 
router.get('/success',client,checkLogout,async(req,res,next)=>{
  try{
    let userName = req.session.address.name
    let userEmail = req.session.address.email
    let planName = req.session.address.planName
    let flag = await database.checkUserPassExist(userEmail);
    if(flag){
      let name = req.user
      let logout = req.Btn
      res.render('success',{name,nav:true,foo:true,logout,otherPages:true,pageTitle:"Success - "})
      req.session.subscription = false; 
      req.session.valid = false;
    }else{
    let userCreated = await database.createUser(req.session.address);
    if(userCreated){ 
    let chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let passwordLength = 12;
    let password = ""; 

    for (let i = 0; i <= passwordLength; i++) {
      let randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber +1);
    } 
    let passwrdCreation = await database.appendPassword(password,userEmail); 
    
    if(passwrdCreation){
      
    transporter.sendMail({
        from:'no-reply@charpstar.com', 
        to:userEmail,
        subject:"Welcome to charpstAR",
        template:'emailOutput', 
        context:{
          email:userEmail,
          userPassword:password 
        }
  });

// send mail with defined transport object
    transporterAdmin.sendMail({
        from:'no-reply@charpstar.com', 
        to:"admin@charpstar.com", 
        subject:"New Subscriber",
        text:`${userName} have been subscribed for ${planName} plan\nsubscribers Mail Id : ${userEmail}`
  });
  // victor mail ends//

      let name = req.user
      let logout = req.Btn
      res.render('success',{name,nav:true,foo:true,logout,otherPages:true,pageTitle:"Success - "})
      req.session.subscription = false; 
      req.session.valid = false;
    }
    } 

    }

  }
  catch(err){
    console.log(err);
    next(err)
  }  
})

router.get('/user/LogOut',(req,res,next)=>{
  try{
    req.session.userLogin = false;
    req.session.currentUser = false;
    let urlFrom = req.headers.referer; 
    let URL = url.parse(urlFrom,true); 
    URL = URL.pathname;  
    if(URL == '/clientArea') res.redirect('/ClientArea/login');
    else res.redirect(URL)
  }catch(error){
    console.log(error);
    next(error)
  }
  
})  
 
router.get('/test',(req,res)=>{
  res.render("emailOutput")
})
    
module.exports = router;
 