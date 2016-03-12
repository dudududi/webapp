
  //==================> DATABASE MODEL IMPORTS <==================
  var Meme = require('./model/Meme');

  function PublicAPI(_app){
    var app = _app;
    // private method which define CRUD API for Memes.
    var memeRoute = function(){
      app.route('/meme')
      .get(function(req, res){
        Meme.find({}).exec(function(err, result){
          if (err){
            res.json(err);
          } else {
            res.json(result);
          }
        })
      })
      .post(function(req, res){
        if (req.body){
          var meme = new Meme(req.body);
          meme.save(function(err){
            if(err){
              res.json({error: err.message});
            } else {
              res.json({status: "saved"});
            }
          });
        }
      });
    }

    //public method where all routes will be defined.
    this.create = function(){
      memeRoute();
    }
  }

  module.exports = PublicAPI;
