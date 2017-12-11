var express = require('express');
var app=express();
var router = express.Router();
var appConfig = require('../configs/appConfig');


/*
Express has a method 'all' that accepts all valid HTTP Request methods. You can use this as a middleware and pass the 
request to the next handler using next() mathod;
 */
router.all('/', function (req, res, next) {
    console.log('-----------------------------------------------------');
    console.log('Angular Client has made a request to the Node Server running on port ' + appConfig.port);
    console.log('-----------------------------------------------------');
    next();
});

module.exports = router;