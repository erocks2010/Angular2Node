var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();

router.get('/',cookieParser(), function (req, res, next) {
    if(req.session.visitedCount!=undefined) req.session.visitedCount++;
    else req.session.visitedCount=0;
    res.send(req.session.id);
});

module.exports=router;