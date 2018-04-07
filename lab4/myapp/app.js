var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//by me module
var twitter = require('twitter');
var config = require('./config');
var client = new twitter(config.twitter);
//my module
var bmw = require('./my_modules/bymewriter');
var bmc = require('./my_modules/bymecapitalizer');
var bmr = require('./my_modules/bymereader');

var routes = require('./routes/index');
var users = require('./routes/users');
//my path
var add = require('./routes/add');
var success = require('./routes/success');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// создаем парсер для данных application/x-www-form-urlencoded
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
//my route
app.use('/add', add)
app.use('/success', success)

app.post("/save_user", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    //console.log(request.body);
    //response.send(`${request.body.fName} - ${request.body.sName}`);
    var page = 'users.csv';
    var fName = bmc(request.body.fName);
    var sName = bmc(request.body.sName);
    var twitterAccount = request.body.twitterAccount;
    var user_id = +bmr(page).length + 1;

    if (fName && sName && twitterAccount[0] === '@') {
        var data = '\n' + fName + ',' + sName + ',' + twitterAccount;
        bmw(data, page);
        response.render('success', {
            fName: fName,
            sName: sName,
            twitterAccount: twitterAccount,
            title: 'Success !'
        });
        //post tweet in user timeline
        client.post('statuses/update', { status: 'Hello, ' + fName + ' ' + sName + ' (' + twitterAccount + '). Your id is: ' + user_id }, function (error, tweet, response) {
            if (error) throw error;
        });
        //redirect to ->
        //response.redirect('/users');
    } else {
        var msg = 'Error ! Data are not saved. ';
        var msg = twitterAccount[0] === '@' ? msg+'Please, fill all fields of form.' : msg+'Invalid screen name (must start with @)';
        response.render('add', {
            error: msg,
            fName: fName,
            sName: sName
        });
    }
});

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
