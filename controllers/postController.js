const { body } = require("express-validator");
const { restart } = require("nodemon");
const Post = require("../models/post");

// Display post create form on GET.
//exports.create_post_get = function (req, res) {
//res.render("post-form", { user: req.user });
//};

// Handle post create on POST.
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
  let time =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();
  let organizedDate = currentDate.toLocaleDateString();

  const post = new Post({
    isPublished: false,
    title: req.body.title,
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

exports.get_post = function (req, res) {
  return res.send(`GET HTTP method on post/${req.params.postId} resource`);
};

exports.get_posts = function (req, res) {
  const posts = [];
  res.json(posts);
};

exports.update_post = function (req, res, next) {
  Post.findByIdAndUpdate(req.body.postid, function updatePost(err) {
    if (err) {
      return next(err);
    }

    res.redirect("/");
  });
};

// Handle post delete on POST.
exports.delete_post = function (req, res, next) {
  Post.findByIdAndRemove(req.body.postid, function deletePost(err) {
    if (err) {
      return next(err);
    }

    res.redirect("/");
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
