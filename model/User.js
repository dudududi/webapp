/**
 * Created by Szymon on 04.04.2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    login: String,
    password: String,
    token: String
});

module.exports = mongoose.model('User', UserSchema);