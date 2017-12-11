var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var tasks = require('./routes/tasks');
var routeMiddleware=require('./routes/routeMiddleware');
var appConfig=require('./configs/appConfig');
var regexRoute=require('./routes/regex');
var cors=require('cors');
var port = appConfig.port;

var app = new express();

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));
// app.use(express.static('media'));

//Body Parser Middle-Ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({origin:true,credentials: true}));

//Routing
app.use(function (req, res, next) {
    console.log('-----------------------------------------------------');
    console.log('Angular Client has made a request to the Node Server running on port ' + appConfig.port +' at :'+Date.now()+' by '+req.url);
    console.log('-----------------------------------------------------');
    next();
})
app.use('/',routeMiddleware);
app.use('/', index);
app.use('/api', tasks);
app.use('/regex',regexRoute);
//Routing End
app.listen(port, function () {
    console.log('Running on port ' + port)
});

module.exports={
    port:port
}
