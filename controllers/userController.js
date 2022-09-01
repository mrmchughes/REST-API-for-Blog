const { body, validationResult } = require("express-validator");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.login = passport.authenticate("local", {
  successRedirect: "/posts",
  failureRedirect: "/users/login",
});

// Handle user create on POST.
exports.signup = [
  // Validate and sanitize fields.
  body("username")
    .trim()
    .isLength({ min: 1 })
    .withMessage("username is required")
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

    // Indicates the success of this synchronous custom validator
    return true;
  }),
  // Process request after validation and sanitization.
  (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.render("sign-up-form", { errors: errors.array() });
      } else {
        let user = new User({
          username: req.body.username,
          password: hashedPassword,
          admin: false,
        }).save((err) => {
          if (err) {
            return next(err);
          }

          res.redirect("/posts");
        });
      }
    });
  },
];

exports.logout = function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/posts");
  });
};

// Creates a new blog post
// POST /posts

// Fetch a single blog post
// GET /posts/:postid

// Update a single blog post
// PUT /posts/:postid

// Delete a single blog post
// DELETE /posts/:postid

// USE THE FOLLOWING FORMAT FOR CONTROLLER FUNCTIONS
//exports.{CREATE / READ / UPDATE / DELETE} followed by the name of the affected model
