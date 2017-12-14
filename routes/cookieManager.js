var express = require('express');
var cookieParser = require('cookie-parser');
var router = express.Router();

router.get('/',cookieParser(), function (req, res, next) {
    res.send(req.session.id);
});

module.exports=router;