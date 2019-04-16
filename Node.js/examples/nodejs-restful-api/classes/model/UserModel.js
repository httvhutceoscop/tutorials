var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    birthday: { type: Date }
});

var User = mongoose.model('User', UserSchema);

module.exports = User;