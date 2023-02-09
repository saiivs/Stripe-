var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
const errorHandler = require('./middleware/Error')

var app = express();
var session=require('express-session')
const hbs = require("hbs");



//helper for n times iteration
hbs.handlebars.registerHelper('times', function(n, block) {
  var accum = '';
  for(var i = 0; i < n; ++i)
      accum += block.fn(i);
  return accum;
});
hbs.handlebars.registerHelper('inc', function(value, options)
{
    return parseInt(value) + 1; 
});

require("./connection/database")
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); 


app.use(logger('dev'));
app.use((req, res, next) => {
  if (req.originalUrl === '/webhook') {
    next(); // Do nothing with the body because I need it in a raw state.
  } else {
    express.json()(req, res, next);  // ONLY do express.json() if the received request is NOT a WebHook from Stripe.
  }
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use((req,res,next)=>{
  if(!req.user){
    res.header('cache-control','private,no-cache,no-store,must ravalidate')
    res.header('Express','-3')
  }
  next();
}) 
app.use(session({
  secret:"key",
  resave:true,
  saveUninitialized:true
}))


 
app.use('/', indexRouter);
app.use('/admin', adminRouter);

app.use(errorHandler)



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(400));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{otherPages:true,pageTitle:"Error - "});
});

module.exports = app;
