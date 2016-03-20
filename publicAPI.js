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
                        res.status(400).json(err);
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
                            res.status(400).json({
                                error: err.message
                            });
                        } else {
                            res.json({
                                status: "saved"
                            });
                        }
                    });
                }
            })
            .put(function(req,res) {
                console.log(req.body);
                res.send(req.body.data);


            });
            app.delete('/meme/:id',function(req,res) {
                Meme.findOne({_id:req.params.id}).remove().exec(function(err, result) {
                    if (err) {
                        res.status(400).json(err);
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
