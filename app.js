// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE.txt in the project root for license information.
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var dotenv = require('dotenv').config();
var index = require('./routes/index');
var authorize = require('./routes/authorize');
var calendar = require('./routes/calendar');
var getCalendar = require('./routes/getCalendar');
var schedule = require('./routes/schedule');
var createCalendar = require('./routes/createCalendar');
var getTask = require('./routes/getTask');
var createTask = require('./routes/createTasks');
var notes = require('./routes/notes');
var calLookup = require('./routes/calLookup')
var intentRouter = require('./routes/intentRouter')
var getNotes = require('./routes/getNotes')
var mongoose = require('mongoose')
var dev_config = require('./config/dev_config')
const request = require('request');
var cache = require('memory-cache');

const port = process.env.PORT || 5000;
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
var server = app.listen(port, () => {
  console.log("App is running on port " + port);
});
// connecting to db 
mongoose.connect(dev_config.mongodb.dbURI, {
  useNewUrlParser: true
}).then(() => {
    console.log("Connected to db")
  },
  (error) => {
    console.log("DB connection Error ===> " + error)
  })

//serving public
app.use(express.static(path.join(__dirname, 'public')));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/index', index);
app.use('/authorize', authorize);
app.use('/calendar', calendar);
app.use('/getCalendar', getCalendar);
app.use('/schedule', schedule);
app.use('/createCalendar', createCalendar);
app.use('/getTask', getTask);
app.use('/createTask', createTask);
app.use('/notes', notes);
app.use('/calLookup', calLookup);
app.use('/intentRouter', intentRouter);
app.use('/getNotes', getNotes);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// keeping server awake
setInterval(function () {
  request.get("https://dry-caverns-78381.herokuapp.com/");
  console.log("Keeping server awake")
}, 900000);

cache.put('imageDisplayed', 0);

var io = require('socket.io').listen(server);
//console.log(server)
io.on('connection', (socket) => {
  console.log("made socket connection")

  socket.emit('image', {
    url: 'images/resized.png'
  })
  socket.on("disconnect", () => console.log("Client disconnected"));
})
var EmitUrl = (imageurl) => {


  io.emit('image', {
    url: imageurl
  })

}


//app.listen(process.env.PORT || 5000, () => console.log('webhook is listening'));
//app.listen(process.env.PORT || port, () => console.log('webhook is listening'));
exports.EmitUrl = EmitUrl;
module.exports = app;