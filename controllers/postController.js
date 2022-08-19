const Post = require("../models/post");

// Display post create form on GET.
//exports.create_post_get = function (req, res) {
//res.render("post-form", { user: req.user });
//};

// Handle post create on POST.
exports.create_post = function (req, res, next) {
  let currentDate = new Date();
  let time =
    currentDate.getHours() +
    ":" +
    currentDate.getMinutes() +
    ":" +
    currentDate.getSeconds();
  let organizedDate = currentDate.toLocaleDateString();

  const post = new POST({
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

exports.get_post = function (req, res, next) {
  res.render("index", {
    title: req.params.postid,
  });
};

exports.get_posts = function (req, res, next) {
  res.render("index", {
    title: "get_posts worked",
    user: req.user,
  });
};

exports.update_post = function (req, res, next) {};

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
