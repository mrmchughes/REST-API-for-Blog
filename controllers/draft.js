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

Post.findByIdAndUpdate(req.body.postid, function updatePost(err) {
  if (err) {
    return next(err);
  }

  res.redirect("/");
});

Post.findByIdAndRemove(req.body.postid, function deletePost(err) {
  if (err) {
    return next(err);
  }

  res.redirect("/");
});
