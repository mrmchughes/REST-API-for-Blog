const express = require("express");
const router = express.Router();

// Require controllers
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

// GET Index page.
router.get("/", function (req, res) {
  res.redirect("/posts");
});

// User ROUTES
router.post("/login", userController.login);

router.get("/logout", userController.logout);

router.post("/signup", userController.signup);

// Post ROUTES
router.get("/posts", postController.get_posts);

router.get("/posts/:postId", postController.get_post);

router.post("/posts", postController.create_post);

router.put("/posts/:postId", postController.update_post);

router.delete("/posts/:postId", postController.delete_post);

// Comment ROUTES
router.get("/posts/:postId/comments", commentController.get_comments);

router.get("/posts/:postId/comments/:commentId", commentController.get_comment);

router.post("/posts/:postId/comments", commentController.create_comment);

router.put(
  "/posts/:postId/comments/:commentId",
  commentController.update_comment
);

router.delete(
  "/posts/:postId/comments/:commentId",
  commentController.delete_comment
);

module.exports = router;
