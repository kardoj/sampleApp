var bcrypt = require('bcrypt');

// takes in string, returns hashed password
exports.cryptPassword = function(password, callback) {
   bcrypt.genSalt(10, function(err, salt) {
    if (err)
      return callback(err);

    bcrypt.hash(password, salt, function(err, hash) {
      return callback(err, hash);
    });

  });
};

//compares (1) unhashed and (2) hashed password
exports.comparePassword = function(password, userPassword, callback) {
   bcrypt.compare(password, userPassword, function(err, isPasswordMatch) {
      if (err)
        return callback(err);
      return callback(null, isPasswordMatch);
   });
};
