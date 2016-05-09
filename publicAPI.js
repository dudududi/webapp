//==================> DATABASE MODEL IMPORTS <==================
var Meme = require('./model/Meme');

function PublicAPI(_app) {
    var app = _app;
    var pageLimit = 10;
    // private method which define CRUD API for Memes.
    var memeRoute = function () {
        app.route('/meme')
            .get(function (req, res) {
                Meme.find({'like':{'$gt': 5 }}).count().exec(function (err, result) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.json({page: parseInt(Math.ceil(result/pageLimit)), count: result});
                    }
                });
            })
            .post(function (req, res) {
                if (req.body) {
                    var meme = new Meme(req.body);
                    meme.save(function (err) {
                        if (err) {
                            res.status(400).json({
                                error: err.message
                            });
                        } else {
                            res.json({
                                status: "Saved"
                            });
                        }
                    });
                }
            })
            .put(function (req, res) {
                var meme = req.body;
                meme.edited_at = new Date();
                Meme.update({
                    "_id": meme._id
                }, meme, function (err, result) {
                    if (err) {
                        res.json({
                            error: err.message
                        });
                    } else {
                        res.json({
                            status: "Updated"
                        });
                    }
                });
            });

        app.route('/meme/page/:page')
            .get(function (req, res) {
                Meme.find({'like':{'$gt': 5 }}).skip((req.params.page-1)*pageLimit).limit(pageLimit).exec(function (err, result) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(result);
                    }
                });
            });

        app.route('/waitingmeme/page/:page')
            .get(function (req, res) {
                Meme.find({'like':{'$lte': 5 }}).skip((req.params.page-1)*pageLimit).limit(pageLimit).exec(function (err, result) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(result);
                    }
                });
            });

        app.route('/waitingmeme')
            .get(function (req, res) {
                Meme.find({'like':{'$lte': 5 }}).count().exec(function (err, result) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.json({page: parseInt(Math.ceil(result/pageLimit)), count: result});
                    }
                });
            });

        app.route('/meme/:id')
            .get(function (req, res) {
                Meme.findOne({
                    _id: req.params.id
                }).exec(function (err, result) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(result);
                    }
                });
            })
            .delete(function (req, res) {
                Meme.findOne({
                    _id: req.params.id
                }).remove().exec(function (err, result) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.json(result);
                    }
                });
            });

        app.route('/meme/:id/comment')
            .put(function (req, res) {
                var comment = req.body;
                comment.date = new Date();
                Meme.findByIdAndUpdate(req.params.id, {
                        $push: {
                            comments: comment
                        }
                    }, {
                        safe: true,
                        upsert: true
                    },
                    function (err, meme) {
                        if (err) {
                            res.status(400).json(err);
                        } else {
                            res.status(200).json('updated');
                        }
                    });
            });
        app.route('/meme/:id/comment/:commentId')
            .delete(function (req, res) {
                Meme.findByIdAndUpdate(req.params.id, {
                        $pull: {
                            comments: {_id: req.params.commentId}
                        },
                        safe: true,
                        upsert: true
                    },
                    function (err) {
                        if (err) {
                            res.status(400).json(err);
                        } else {
                            res.status(200).json('deleted');
                        }
                    });
            }).put(function (req, res) {
            var comment = req.body;
            Meme.update({'comments._id': req.params.commentId}, {
                    $set: {
                        'comments.$.body': comment.body,
                        'comments.$.edited_at': new Date()
                    }
                },
                function (err) {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.status(200).json('updated');
                    }
                });
        });
    };

    //public method where all routes will be defined.
    this.create = function () {
        memeRoute();
    };
}

module.exports = PublicAPI;
