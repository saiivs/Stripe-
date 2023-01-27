const errorHandler = (error,req,res,next)=>{
    console.log("enter");
   res.status(error.status || 500).render('serverError',{error:true,message:error.message || "Interior server error. Please try again later"})
}
module.exports = errorHandler