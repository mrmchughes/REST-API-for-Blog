const { body } = require("express-validator");
const Post = require("../models/post");
const Comment = require("../models/comment");
const async = require("async");

// Create a post
exports.create_post = function (req, res, next) {
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Title must be specified.");
  body("message")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Post message must be specified.");

  let currentDate = new Date();
  let time = currentDate.getHours() + ":" + currentDate.getMinutes();

  let options = { month: "short", day: "numeric", year: "numeric" };
  let organizedDate = currentDate.toLocaleDateString("en-US", options);

  const post = new Post({
    title: req.body.title,
    user: req.user.username,
    timestamp: organizedDate + " " + time,
    message: req.body.message,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.json(post);
  });
};

// Fetch all posts
exports.get_posts = function (req, res, next) {
  Post.find({}).exec(function (err, list_posts) {
    if (err) {
      return next(err);
    }
    res.json(list_posts);
  });
};

// Fetch a single post
exports.get_post = function (req, res, next) {
  async.parallel(
    {
      post: function (callback) {
        Post.findById(req.params.postId).exec(callback);
      },
      comments: function (callback) {
        Comment.find({ post: req.params.postId }).exec(callback);
      },
    },

    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.post == null) {
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
      }
      res.json(results.post);
    }
  );
};

// Update a post
exports.update_post = function (req, res, next) {
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Title must be specified.");
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

  Post.findByIdAndUpdate(
    req.params.postId,
    {
      title: req.body.title,
      timestamp: organizedDate + " " + time,
      message: req.body.message,
    },
    function (err) {
      if (err) {
        return next(err);
      }

      res.redirect(`/posts/${req.params.postId}`);
    }
  );
};

// Delete a post
exports.delete_post = function (req, res, next) {
  Post.findByIdAndRemove(req.params.postId, function deletePost(err) {
    if (err) {
      return next(err);
    }

    res.redirect("/posts");
  });
};
