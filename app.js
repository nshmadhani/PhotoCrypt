var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var util = require('util');
var formidable = require('formidable');
var multer = require('multer');
var fs = require('fs');
var async = require('async');

var index = require('./routes/index');
var users = require('./routes/users');
var encrypt = require('./routes/encrypt');
var download = require('./routes/download');
var decrypt = require('./routes/decrypt.js');
var encode = require('./Steganography/encode');
var decode = require('./Steganography/decode');
var app = express();





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/encrypt', encrypt);
app.use('/downloads', download);
app.use('/decrypt', decrypt);

app.get('/modal.html',function(req,res){
   res.sendFile(path.join(__dirname,'/views/','modal.html'));
})

//I SHould see this change
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


 module.exports = app;
