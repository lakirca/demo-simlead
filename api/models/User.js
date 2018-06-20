const bcrypt = require('bcrypt-nodejs');
module.exports = {
  attributes: {
    username: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  },
  customToJSON: function() {
    return _.omit(this, ['password']);
  },
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return cb(err);
        }
        user.password = hash;
        return cb();
      });
    });
  }
};
