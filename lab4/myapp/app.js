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
//mongo_db
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//my module
var bmc = require('./my_modules/bymecapitalizer');

//Mongo
// Connection URL -> cluster -> config file
var uri = "mongodb://TheMole:TheMole@clustercourse-shard-00-00-kultg.mongodb.net:27017,clustercourse-shard-00-01-kultg.mongodb.net:27017,clustercourse-shard-00-02-kultg.mongodb.net:27017/test?ssl=true&replicaSet=ClusterCourse-shard-0&authSource=admin";
// Database config
const dbName = 'test';
const collectName = 'users';

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
    //response.send(`${request.body.fName} - ${request.body.lName}`)
    var fName = bmc(request.body.fName);
    var lName = bmc(request.body.lName);
    var twitterAccount = request.body.twitterAccount;
    var user_id;;

    if (fName && lName && twitterAccount[0] === '@') {
        //send in MongoDB
        // Use connect method to connect to the server
        MongoClient.connect(uri, function (err, client) {
            assert.equal(null, err);
            console.log("Connected successfully to server for adding a new user in app.js");
            const db = client.db(dbName);
            var objectToInsert = {
                firstName: fName,
                lastName: lName,
                twitter: twitterAccount
            };
            db.collection(collectName).insert(objectToInsert, function (err, docsInserted) {
                //callback which contain UserData
/**Switch off Tweets by comment string bellow */
                tweet_poster(docsInserted.insertedIds[0]);
            });

            client.close();
            response.render('success', {
                fName: fName,
                lName: lName,
                twitterAccount: twitterAccount,
                title: 'Success !'
            });
        });

        //post tweet in user timeline
        function tweet_poster(user_id) {
            client.post('statuses/update', { status: 'Hello, ' + fName + ' ' + lName + ' (' + twitterAccount + '). Your id is: ' + user_id }, function (error, tweet, response) {
                if (error) throw error;
            });
        }
        //redirect to ->
        //response.redirect('/users');
    } else {
        var msg = 'Error ! Data are not saved. ';
        var msg = twitterAccount[0] === '@' ? msg + 'Please, fill all fields of form.' : msg + 'Invalid screen name (must start with @)';
        response.render('add', {
            error: msg,
            fName: fName,
            lName: lName
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
