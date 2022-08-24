const { body } = require("express-validator");
const { restart } = require("nodemon");
const Post = require("../models/post");
const async = require("async");

// Display post create form on GET.
//exports.create_post_get = function (req, res) {
//res.render("post-form", { user: req.user });
//};

// Handle post create on POST.
exports.create_post = function (req, res) {
  return res.send(`POST HTTP method on posts resource`);
};

exports.get_posts = function (req, res) {
  Post.find({}).exec(function (err, list_posts) {
    if (err) {
      return next(err);
    }
    res.send(list_posts);
  });
};

exports.get_post = function (req, res, next) {
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
      if (results.post == null) {
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
      }
      res.send(results.post);
    }
  );
};

exports.update_post = function (req, res) {
  return res.send(`PUT HTTP method on post/${req.params.postId} resource`);
};

// Handle post delete on POST.
exports.delete_post = function (req, res) {
  return res.send(`DELETE HTTP method on post/${req.params.postId} resource`);
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
