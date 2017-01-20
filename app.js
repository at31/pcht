var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var phase1 = require('./routes/phase1');
var phase2 = require('./routes/phase2');
var crossroad = require('./routes/crossroad');

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

app.use(session({
  secret: '@at31 atcrew3',
  resave: false,
  saveUninitialized: false,
  // Место хранения можно выбрать из множества вариантов, это и БД и файлы и Memcached.
  store: new MongoStore({ 
    url: 'mongodb://localhost:27017/test',
  })
}));


//CORS
/*app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials","true");
  res.header("Access-Control-Allow-Method", "GET,POST,PUT,DELETE");
  res.header("Access-Control-Allow-Method", "Content-Type");
  next();
});*/

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/phase1', phase1);
app.use('/phase2', phase2);
app.use('/crossroad', crossroad);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
