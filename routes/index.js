const express = require("express");
const router = express.Router();
const passport = require("passport");

const Comment = require("../models/comment");

// Require controllers
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

// GET Index page.
router.get("/", function (req, res) {
  Message.find({}, "title message timestamp user")
    .sort({ timestamp: 1 })
    .exec(function (err, list_messages) {
      if (err) {
        return next(err);
      }
      res.render("index", {
        title: "Members Only",
        user: req.user,
        messages: list_messages,
      });
    });
});

// GET signup page.
router.get("/sign-up", userController.create_user_get);

// GET Log-in page.
router.get("/log-in", function (req, res) {
  res.render("log-in-form", { user: req.user });
});

// GET Log-Out page.
router.get("/log-out", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// GET Message page.
router.get("/message", messageController.create_message_get);

// GET Become Member page.
router.get("/become-member", userController.become_member_get);

// GET Become Admin page.
router.get("/become-admin", userController.become_admin_get);

// POST signup page.
router.post("/sign-up", userController.create_user_post);

// POST log-in page.
router.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in",
  })
);

// POST Create Message
router.post("/message", messageController.create_message_post);

// POST Delete Message
router.post("/", messageController.delete_message_post);

// POST Become Member page.
router.post("/become-member", userController.become_member_post);

// POST Become Admin page.
router.post("/become-admin", userController.become_admin_post);

module.exports = router;
