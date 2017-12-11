var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var tasks = require('./routes/tasks');
var routeMiddleware = require('./routes/routeMiddleware');
var appConfig = require('./configs/appConfig');
var regexRoute = require('./routes/regex');
var cors = require('cors');
var port = appConfig.port;
var app = new express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var jsonParser = bodyParser.json()

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'media')));
// app.use(express.static('media'));

//Body Parser Middle-Ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(cors({origin: true, credentials: true}));

//Routing
// app.use(function (req, res, next) {
//     console.log('This is the APP level general middleware');
//     next();
// });

/*
Express multiple middleware routing at APP level
* */

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


app.use('/', routeMiddleware);
app.use('/', index);
app.use('/api', tasks);
app.use('/regex', regexRoute);
//Routing End
app.listen(port, function () {
    console.log('Running on port ' + port)
});


/*
Express handling post methods
*/
app.post('/post',urlencodedParser,function(req,res){
    console.log(req,res);
    res.send();
})

module.exports = {
    port: port
}
