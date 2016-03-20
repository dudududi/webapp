//==================> DATABASE MODEL IMPORTS <==================
var Meme = require('./model/Meme');

function PublicAPI(_app) {
    var app = _app;
    // private method which define CRUD API for Memes.
    var memeRoute = function() {
        app.route('/meme')
            .get(function(req, res) {
                Meme.find({}).exec(function(err, result) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(result);
                    }
                });
            })
            .post(function(req, res) {
                if (req.body) {
                    var meme = new Meme(req.body);
                    meme.save(function(err) {
                        if (err) {
                            res.json({
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
            .put(function(req,res) {
                console.log(req.body);
                var meme = req.body;
                Meme.update({ "_id": meme._id }, meme, function (err, result) {
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

            app.route('/meme/:id')
            .get(function(req,res) {
                Meme.findOne({_id:req.params.id}).exec(function(err, result) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(result);
                    }
                });
            })
            .delete(function(req,res) {
                Meme.findOne({_id:req.params.id}).remove().exec(function(err, result) {
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(result);
                    }
                });
            });
    };

    //public method where all routes will be defined.
    this.create = function() {
        memeRoute();
    };
}

module.exports = PublicAPI;
