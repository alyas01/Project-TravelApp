require('dotenv').config(); 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose'); 

var indexRouter = require('./routes/index');

// For Passport.js: 

const User = require('./models/user'); 
const passport = require('passport'); 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//configure passport middleware 
app.use(passport.initialize()); 
app.use(passport.session()); 

passport.use(User.createStrategy()); // provided by passport for the user schema 
passport.serializeUser(User.serializeUser()); 
passport.deserializeUser(User.deserializeUser()); 



app.use((req, res, next) => {
	//console.log('current path is:' + req.path);
	res.locals.url = req.path 
	next(); 
}); 

//set up mongoose connection 
mongoose.connect(process.env.DB);
mongoose.Promise = global.Promise; 
mongoose.connection.on('error', (error)=> console.error(error.message)); 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
