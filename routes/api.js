const express = require("express");
const router = express.Router();
const passport = require("passport");

// Require controllers
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

const Post = require("../models/post");
const Comment = require("../models/comment");
const user = require("../models/user");

// GET Index page.
router.get("/", function (req, res) {
  Post.find({}, "title user timestamp message")
    .sort({ timestamp: 1 })
    .exec(function (err, list_posts) {
      if (err) {
        return next(err);
      }
      res.render("index", {
        title: "Blog API",
        user: req.user,
        posts: list_posts,
      });
    });
});

// User ROUTES
router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.post("/signup", userController.signup);

// Post ROUTES
router.get("/posts", postController.get_posts);

router.get("/posts/:postId", postController.get_post);

router.post("/posts", postController.create_post);

router.put("/posts/:postid", postController.update_post);

router.delete("/posts/:postid", postController.delete_post);

// Comment ROUTES
router.get("/posts/:postid/comments", commentController.get_comments);

router.get("/posts/:id/comments/:commentid", commentController.get_comment);

router.post("/posts/:postid/comments", commentController.create_comment);

router.put("/posts/:id/comments/:commentid", commentController.update_comment);

router.delete(
  "/posts/:id/comments/:commentid",
  commentController.delete_comment
);

module.exports = router;
