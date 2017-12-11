var express = require('express');
var router = express.Router();

/*Express lets you use regular expression for the URL.Behind the code it uses path-to-regexp npm package for this 
functionality . You can test the regular expression path at http://forbeslindesay.github.io/express-route-tester/
 */
router.get(/ab$/, function (req, res) {
    res.send(req.hostname + ':' + req.socket.localPort + req.baseUrl + req.url);
});

/*
Express lets you add paramerters to your query string. To have more control over the params added you can specify a 
regular expression to validate the params added by the client in the request.
*/
router.get('/user/:userID([a-z]{1,})', function (req, res) {
    res.send('UserID is :' + req.params.userID);
})

/*
Express lets you write multiple callbacks function for a single request and each one execute one after the other.
You can pass an array of callbacks too.
 */

var cal5 = function (req, res, next) {
    console.log('callback 5');
    next();
}
var cal6 = function (req, res, next) {
    console.log('callback 6');
    next();
}
var cal7 = function (req, res, next) {
    console.log('callback 7');
    res.send('All callbacks executed');
}
router.get('/multipleCallback', function (req, res, next) {
        console.log('callback 1');
        next();
    }, function (req, res, next) {
        console.log('callback 2');
        next();
    }, function (req, res, next) {
        console.log('callback 3');
        next();
    }, function (req, res, next) {
        console.log('callback 4');
        next();
    },
    [cal5, cal6, cal7]);

/*
Express different response methods
 */
router.get('/download', function (req, res) {
    res.download('./media/test.txt', 'NewFile.txt', function (err) {
        if (err) {
            console.log('There was an error in transfering the file ' + err);
            res.status(400);
            res.end();
        }
    });
})

/*
Express lets you capture the Contnt-Type of the request and send the response accordingly
 */

router.get('/format', function (req, res) {
    res.format({
        'text/plain': function () {
            res.send('Welcome');
        },
        'text/html': function () {
            res.send('<div>Welcome</div>');
        }
    })
})

/*Express lets you send json response */
router.get('/json', function (req, res) {
    res.location('/foo/bar');// Add Response Header 'location'
    res.links({
        tarun: 'www.google.com'
    }); // Add response header 'links'
    res.json({user: 'TarunMathur'});
})

/*Express let you redirect to some other URL
 */
router.get('/redirect', function (req, res) {
    res.redirect(200, '../json');
})

/*
Express middleware functions can pass on the control to the next identical route or to the next middleware function.
 */

router.get('/identical/:id', function (req, res, next) {
        console.log('First Middleware function');
        if (req.params.id == 1) next();
        else next('route');
    },
    function (req, res, next) {
        console.log('Finally sending the reponse after the middleware function has executed');
        res.status(200).send('Executed First Middleware function and then sent the response');
    })

router.get('/identical/:id', function (req, res) {
    console.log('The second identical route');
    res.status(200).send('Executed the second idential route');
});

/*
Express multiple middleware at Router level
*/

router.use(function (req, res, next) {
    console.log('This is the Router level general middleware');
    next();
});

router.use('/multiplemiddleware/:id', function (req, res, next) {
    console.log('First Router Middleware function');
    next();
}, function (req, res, next) {
    console.log('Second Router Middleware function');
    next();
})

router.get('/multiplemiddleware/:id', function (req, res, next) {
    console.log('First Router Route method');
    if (req.params.id == 1) {
        next();
    }
    else next('route');
}, function (req, res, next) {
    console.log('First Router Route Second Middleware');
    res.send('Success from Router route1 second middleware');
});
router.get('/multiplemiddleware/:id', function (req, res, next) {
    console.log('Second Router Route Method');
    res.send('Success from Router route 2');
});

module.exports = router;