var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//region requiring routes
var index = require('./routes/index');
var tasks = require('./routes/tasks');
var routeMiddleware = require('./routes/routeMiddleware');
var regexRoute = require('./routes/regex');
var cookieManager = require('./routes/cookieManager');
var connectMongo=require('connect-mongo');
//endregion

var appConfig = require('./configs/appConfig');
var cors = require('cors');
var port = appConfig.port;
var app = new express();

// region body-parser middleware functions
const mongoSession=connectMongo(session);
app.use(bodyParser.json());// All request will be passed through this middleware and if it has any json , that will be added to body:{} onbect in req
app.use(bodyParser.text());// All request will be passed through this middleware and if it has any text , that will be added to body:{} object in req
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    // store:new mongoSession({
    //     dbPromise:connectionProvider()
    // }),
    secret: 'heisenberg', saveUninitialized: true, resave: true, cookie: {maxAge: 10000, httpOnly: true}
}));
/* All request will be passed through this middleware and if it has any form data(application/x-www-urlencoded Content-Type) ,
 that will be added to body:{} object in req
*/
//endregion

//region View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
//endregion

//Set Static Folder
app.use(express.static(path.join(__dirname, 'media')));
//CORS
app.use(cors({origin: true, credentials: true}));

//Routing
// app.use(function (req, res, next) {
//     console.log('This is the APP level general middleware');
//     next();
// });

//region Express multiple middleware routing at APP level
app.use('/multiplemiddleware/:id', function (req, res, next) {
    console.log('First Middleware function');
    next();
}, function (req, res, next) {
    console.log('Second Middleware function');
    next();
})

app.get('/multiplemiddleware/:id', function (req, res, next) {
    console.log('First Route method');
    if (req.params.id == 1) {
        next();
    }
    else next('route');
}, function (req, res, next) {
    console.log('First Route Second Middleware');
    res.send('Success from route1 second middleware');
});
app.get('/multiplemiddleware/:id', function (req, res, next) {
    console.log('Second Route Method');
    res.send('Success from route 2');
});
//endregion

//region using routes , creating navigation
app.use('/', routeMiddleware);
app.use('/', index);
app.use('/api', tasks);
app.use('/regex', regexRoute);
app.use('/getCookie', cookieManager);
//endregion

app.listen(port, function () {
    console.log('Running on port ' + port)
});

/*
Express handling post methods
*/
app.post('/post', function (req, res) {
    console.log(req, res);
    res.send();
})

module.exports = {
    port: port
}
