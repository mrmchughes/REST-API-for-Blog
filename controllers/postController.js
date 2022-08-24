const { body } = require("express-validator");
const { restart } = require("nodemon");
const Post = require("../models/post");
const async = require("async");

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

  const testPost = {
    title: "Test Title 3",
    user: "Test User 3",
    timestamp: "8/24/2022 10:50:52",
    message: "Test Message 3",
  };

  const post = new Post({
    isPublished: false,
    title: testPost.title,
    user: testPost.user,
    timestamp: testPost.timestamp,
    message: testPost.message,
  }).save((err) => {
    if (err) {
      return next(err);
    }
    res.send(post);
  });
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

exports.update_post = function (req, res, next) {
  Post.findByIdAndUpdate(
    req.params.postId,
    { title: "Updated Title 1" },
    function (err, post) {
      if (err) {
        return next(err);
      }

      res.redirect("/posts");
    }
  );
};

// Handle post delete on POST.
exports.delete_post = function (req, res, next) {
  Post.findByIdAndRemove(req.params.postId, function deletePost(err) {
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