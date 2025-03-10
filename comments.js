// create web service
var express = require('express');
var router = express.Router();
var comment = require('../models/comment');

// create a comment
router.post('/', function(req, res){
    var newComment = new comment();
    newComment.content = req.body.content;
    newComment.save(function(err, comment){
        if(err){
            res.send('error saving comment');
        } else {
            res.send(comment);
        }
    });
});

// get all comments
router.get('/', function(req, res){
    comment.find({}, function(err, comments){
        if(err){
            res.send('error getting comments');
        } else {
            res.send(comments);
        }
    });
});

// get a single comment
router.get('/:id', function(req, res){
    comment.findById(req.params.id, function(err, comment){
        if(err){
            res.send('error getting comment');
        } else {
            res.send(comment);
        }
    });
});

// update a comment
router.put('/:id', function(req, res){
    comment.findById(req.params.id, function(err, comment){
        if(err){
            res.send('error getting comment');
        } else {
            comment.content = req.body.content;
            comment.save(function(err, comment){
                if(err){
                    res.send('error updating comment');
                } else {
                    res.send(comment);
                }
            });
        }
    });
});

// delete a comment
router.delete('/:id', function(req, res){
    comment.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.send('error deleting comment');
        } else {
            res.send('comment deleted');
        }
    });
});

module.exports = router;