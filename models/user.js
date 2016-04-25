var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
});

var User = mongoose.model('User', UserSchema);

module.exports = {
  User: User
};
