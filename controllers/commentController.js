const Comment = require("../models/comment");

// Handle comment create on POST.
exports.create_comment = function (req, res, next) {
  let currentDate = new Date();
  let time =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();
  let organizedDate = currentDate.toLocaleDateString();

  const post = new POST({
    user: req.user.username,
    timestamp: organizedDate + " " + time,
    message: req.body.message,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.get_comment = function (req, res, next) {};

exports.get_comments = function (req, res, next) {};

exports.update_comment = function (req, res, next) {};

exports.update_comments = function (req, res, next) {};

// Handle comment delete on POST.
exports.delete_comment = function (req, res, next) {
  Comment.findByIdAndRemove(req.body.commentid, function deleteComment(err) {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
};

exports.delete_comments = function (req, res, next) {};

// Create a new comment

// Fetch a single comment

// Fetch all post comments

// Update a single comment

// Delete a single comment

// Delete all post comments

// USE THE FOLLOWING FORMAT FOR CONTROLLER FUNCTIONS
//exports.{CREATE / READ / UPDATE / DELETE} followed by the name of the affected model
