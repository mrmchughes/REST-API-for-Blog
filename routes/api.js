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
router.get("/", function (req, res) {});

// User ROUTES
router.get("/users/login", userController.login_get);

router.post("/users/login", userController.login_post);

router.get("/users/logout", userController.logout);

router.get("/users/signup", userController.signup_get);

router.post("/users/signup", userController.signup_post);

// Post ROUTES
router.get("/posts", postController.get_posts);

router.get("/posts/:postId", postController.get_post);

router.get("/create", postController.create_post_get);

router.post("/create", postController.create_post_post);

router.put("/posts/:postId", postController.update_post);

router.delete("/posts/:postId", postController.delete_post);

// Comment ROUTES
router.get("/posts/:postId/comments", commentController.get_comments);

router.get("/posts/:postId/comments/:commentId", commentController.get_comment);

router.post("/posts/:postId", commentController.create_comment);

router.put(
  "/posts/:postId/comments/:commentId",
  commentController.update_comment
);

router.delete(
  "/posts/:postId/comments/:commentId",
  commentController.delete_comment
);

module.exports = router;
