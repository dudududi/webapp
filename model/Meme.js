var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memeSchema = new Schema({
  title: String,
  description: String,
  created_at: Date,
  author: String,
  imgUrl: String,
  comments: [{ body: String, date: Date ,author: String}],
  meta: {
    like: Number,
    unlike:  Number
  }
});

memeSchema.pre('save', function(next) {
  var error = null;
  if (!this.title) {
    error = new Error("Title is missing!");
  } else if (!this.description) {
    error = new Error("Description is missing!");
  }
  if (!this.created_at){
    var currentDate = new Date();
    this.created_at = currentDate;
  }
  this.meta.like = 0;
  this.meta.unlike = 0;

  next(error);
});

/*
here you can add custom methods
important! methods needs to be added BEFORE creating model
for example:
memeSchema.methods.myCustomMethod = function(){
  console.log("Foo!");
}
*/

var Meme = mongoose.model('Meme', memeSchema);
module.exports = Meme;
