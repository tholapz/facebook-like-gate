var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
require('./lib/signedrequest');

var app = express();

var staticMiddleware = express.static(path.join(__dirname, 'public'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(staticMiddleware);

// app.get('/', routes);
app.post('/', function(req, res) {
    console.log(req.body.signed_request);
    var verifier = new SignedRequest('8a3d5d083101a41865c1df215fd58046', req.body.signed_request);
    
    console.log(verifier.data);
    var data = verifier.data
    var is_liked = data.page.liked
    if(is_liked){
        res.redirect('/?app=fb');
    }
    res.end("please like the page first");
     
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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
