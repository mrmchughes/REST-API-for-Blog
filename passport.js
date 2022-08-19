const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    function (username, password, cb) {
      return UserModel.findOne({ username, password })
        .then((user) => {
          if (!user) {
            return cb(null, false, {
              message: "Incorrect username or password.",
            });
          }

          return cb(null, user, { message: "Logged In Successfully" });
        })
        .catch((err) => cb(err));
    }
  )
);
