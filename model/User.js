/**
 * Created by Szymon on 04.04.2016.
 */
var mongose = require('mongoose');
var Schema = mongose.Scema;

var UserSchema = new Schema({
    email: String,
    login: String,
    password: String,
    token: String
});

module.exports = mongose.model('User', UserSchema);