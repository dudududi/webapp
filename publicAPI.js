//==================> DATABASE MODEL IMPORTS <==================
var Meme = require('./model/Meme');
var User = require('./model/User');

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
                                status: "Saved"
                            });
                        }
                    });
                }
            })
            .put(function(req,res) {
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
                        res.status(400).json(err);
                    } else {
                        res.json(result);
                    }
                });
            });
    };

    var authenticationJWT = function () {
        app.route('/authenticate')
            .post(function (req, res) {
                User.findOne({login: req.body.login, password: req.body.password}, function (err, user) {
                    if(err){
                        res.json({
                            type: false,
                            data: "Error occured: " + err
                        });
                    } else{
                        if (user) {
                            res.json({
                                type: true,
                                data: user,
                                token: user.token
                            });
                        } else {
                            res.json({
                                type: false,
                                data: "Incorrect login/password"
                            });
                        }
                    }
                });
            });

        app.route('/signin')
            .post(function (req, res) {
                User.findOne({email: req.body.email, login: req.body.login, password: req.body.password}, function (err, user) {
                    if (err){
                        res.json({
                            type: false,
                            data: "Error occured: "+err
                        });
                    } else {
                        if (user) {
                            res.json({
                                type: false,
                                data: "User already exists!"
                            });
                        } else {
                            var userModel = new User();
                            userModel.email = req.body.email;
                            userModel.login = req.body.login;
                            userModel.password = req.body.password;
                            userMode.save(function(err, user){
                                user.token = jwt.sign(user, process.env.JWT_SECRET);
                                user.save(function(err, user1){
                                    res.json({
                                        type: true,
                                        data: user1,
                                        token: user1.token
                                    });
                                });
                            })
                        }
                    }
                });
            });

        app.route('/me')
            .get(ensureAuthorized, function (req, res) {
                User.findOne({token: req.token}, function (err, user) {
                    if(err){
                        res.json({
                            type: false,
                            data: "Error occured: "+err
                        });
                    } else{
                        res.json({
                            type: true,
                            data: user
                        });
                    }
                });
            })
        
    };
    
    function ensureAuthorized(req, res, next) {
        var bearerToken;
        var bearerHeader = req.headers["authorization"];
        if(typeof bearerHeader !== 'undefined'){
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else{
            res.send(403);
        }
    }

    //public method where all routes will be defined.
    this.create = function() {
        memeRoute();
        authenticationJWT();
    };
}

module.exports = PublicAPI;
