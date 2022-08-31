const { body } = require("express-validator");
const Comment = require("../models/comment");
const Post = require("../models/post");
const async = require("async");

// Handle comment create on POST.
exports.create_comment = async (req, res) => {
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
    post: req.params.postId,
    user: req.body.user,
    timestamp: organizedDate + " " + time,
    message: req.body.message,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.send(comment);
  });
};

exports.get_comments = function (req, res, next) {
  async.parallel(
    {
      post: function (callback) {
        Post.findById(req.params.postId).exec(callback);
      },
      comment(callback) {
        Comment.find({ post: req.params.postId }).exec(callback);
      },
    },

    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.post == null) {
        const err = new Error("Post comments not found");
        err.status = 404;
        return next(err);
      }
      res.send(results.comment);
    }
  );
};

exports.get_comment = function (req, res, next) {
  async.parallel(
    {
      comment(callback) {
        Comment.findById(req.params.commentId).exec(callback);
      },
    },

    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.comment == null) {
        const err = new Error("Comment not found");
        err.status = 404;
        return next(err);
      }
      res.send(results.comment);
    }
  );
};

exports.update_comment = function (req, res, next) {
  body("message")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Comment message must be specified.");

  let currentDate = new Date();
  let time =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();
  let organizedDate = currentDate.toLocaleDateString();

  Comment.findByIdAndUpdate(
    req.params.commentId,
    {
      user: req.body.user,
      timestamp: organizedDate + " " + time,
      message: req.body.message,
    },
    function (err, comment) {
      if (err) {
        return next(err);
      }

      res.redirect(
        `/posts/${req.params.postId}/comments/${req.params.commentId}`
      );
    }
  );
};

// Handle comment delete on POST.
exports.delete_comment = function (req, res, next) {
  Comment.findByIdAndRemove(req.params.commentId, function deleteComment(err) {
    if (err) {
      return next(err);
    }

    res.redirect(`/posts/${req.params.postId}`);
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
