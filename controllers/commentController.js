const { body } = require("express-validator");
const Comment = require("../models/comment");
const Post = require("../models/post");
const async = require("async");

// Handle comment create on POST.
exports.create_comment = function (req, res, next) {
  body("message")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Post message must be specified.");

  let currentDate = new Date();
  let time =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();
  let organizedDate = currentDate.toLocaleDateString();

  const comment = new Comment({
    user: req.body.user,
    timestamp: organizedDate + " " + time,
    message: req.body.message,
  });

  Post.findByIdAndUpdate(req.params.postId, {
    $push: { comments: { comment } },
  });
};

exports.get_comments = function (req, res, next) {
  async.parallel(
    {
      post(callback) {
        Post.findById(req.params.postId).exec(callback);
      },
    },

    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.post.comments == null) {
        const err = new Error("Post comments not found");
        err.status = 404;
        return next(err);
      }
      res.send(results.post.comments);
    }
  );
};

exports.get_comment = function (req, res, next) {
  async.parallel(
    {
      post(callback) {
        Post.findById(req.params.postId).exec(callback);
      },
      comments(callback) {
        Comment.findById(req.params.commentId).exec(callback);
      },
    },

    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.post.comments.comment == null) {
        const err = new Error("Comment not found");
        err.status = 404;
        return next(err);
      }
      res.send(results.post.comments.comment);
    }
  );
};

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
