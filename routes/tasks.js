var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var cors = require('cors');
var db = mongojs('mongodb://tarun:tarun@ds249545.mlab.com:49545/angular2node', ['tasks', 'navBarMain']);

//Get all tasks
router.get('/navBarMenuItems', function (req, res, next) {
    db.navBarMain.find(function (err, navBarMenuItems) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(navBarMenuItems);
        }
    });
});

//Get Single Task
router.get('/task/:id', function (req, res, next) {
    db.tasks.findOne({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(task);
        }
    });
});

//Save Tasks
router.post('/task', function (req, res, next) {
    var task = req.body;
    if (!task.title || (task.isdone + '')) {
        res.status(400);
        res.json({
            'error': 'An error'
        });
    }
    else {
        db.tasks.save(task, function (err, task) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(task);
            }
        })
    }
});

//Delete Task
router.delete('/task/:id', function (req, res, next) {
    db.tasks.remove({ _id: mongojs.ObjectId(req.params.id) }, function (err, task) {
        if (err) {
            res.send(err);
        }
        else {
            res.json(task);
        }
    });
});

//Update Task
router.put('/task/:id', function (req, res, next) {
    var task = req.body;
    var updTask = {};
    if (task.isdone) {
        updTask.isDone = task.isdone;
    }
    if (task.title) {
        updTask.title = task.title;
    }
    if (!updTask) {
        res.status(400);
        res.json({
            'error': 'Bad Data'
        });
    }
    else {
        db.tasks.update({ _id: mongojs.ObjectId(req.params.id) }, updTask, {}, function (err, task) {
            if (err) {
                res.send(err);
            }
            else {
                res.json(task);
            }
        });
    }
});

module.exports = router;