const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  bcrypt = require('bcrypt-nodejs');

// Serialize the User
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

// Deserialize the User
passport.deserializeUser((id, cb) => {
  User.findOne({ id }, (err, user) => {
    cb(err, user);
  });
});

// Register User via Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passportField: 'password'
    },
    (username, password, cb) => {
      User.findOne({ username }, (err, user) => {
        if (err) {
          return cb(err);
        }
        if (!user) {
          return cb(null, false, { message: 'Username not found' });
        }
        bcrypt.compare(password, user.password, (err, res) => {
          if (!res) {
            return cb(null, false, { message: 'Invalid Password' });
          }
          return cb(null, user, { message: 'Login Succesful' });
        });
      });
    }
  )
);
