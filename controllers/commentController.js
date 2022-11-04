const { body } = require("express-validator");
const Comment = require("../models/comment");
const Post = require("../models/post");
const async = require("async");

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Create a comment
exports.create_comment = function (req, res) {
  body("message")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Comment message must be specified.");

  const d = new Date();
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let time = h + ":" + m;

  let options = { month: "short", day: "numeric", year: "numeric" };
  let organizedDate = d.toLocaleDateString("en-US", options);

  const comment = new Comment({
    post: req.params.postId,
    user: req.user.username,
    timestamp: organizedDate + " " + time,
    message: req.body.message,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.json(comment);
  });
};

// Fetch all comments
exports.get_comments = function (req, res, next) {
  async.parallel(
    {
      post: function (callback) {
        Post.findById(req.params.postId).exec(callback);
      },
      comments(callback) {
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
      res.json(results.comments);
    }
  );
};

// Fetch a single comment
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
      res.json(results.comment);
    }
  );
};

// Update a comment
exports.update_comment = function (req, res, next) {
  body("message")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Comment message must be specified.");

  const d = new Date();
  let h = addZero(d.getHours());
  let m = addZero(d.getMinutes());
  let time = h + ":" + m;

  let options = { month: "short", day: "numeric", year: "numeric" };
  let organizedDate = d.toLocaleDateString("en-US", options);

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
    }
  );
};

// Delete a comment
exports.delete_comment = function (req, res, next) {
  Comment.findByIdAndRemove(req.params.commentId, function deleteComment(err) {
    if (err) {
      return next(err);
    }
  });
};
