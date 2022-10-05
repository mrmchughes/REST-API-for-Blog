const { body, validationResult } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

// Login a user
exports.login = async (req, res, next) => {
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, username: user.username };
        const token = jwt.sign({ user: body }, process.env.jwtSecret, {
          expiresIn: "1d",
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

// Signup a user
exports.signup = [
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("username is required")
    .isLength({ max: 30 })
    .withMessage("username can't be more than 30 characters")
    .isAlphanumeric()
    .withMessage(
      "Username must only include alpha-numeric characters, and no spaces"
    ),
  body("password")
    .trim()
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters, include at least 1 lowercase letter, one uppercase letter, 1 number, and 1 symbol"
    ),
  body("confirmpassword").custom((value, { req }) => {
    console.log(value);

    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    return true;
  }),

  (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.render("/signup", { errors: errors.array() });
      } else {
        let user = new User({
          username: req.body.username,
          password: hashedPassword,
          admin: false,
        }).save((err) => {
          if (err) {
            return next(err);
          }

          res.redirect("/");
        });
      }
    });
  },
];

// Logout a user
exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/posts");
  });
};
