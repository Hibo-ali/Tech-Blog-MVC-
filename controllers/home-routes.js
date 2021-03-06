const router = require("express").Router();
const { Post, Comment, User } = require("../models");

// Get all posts for homepage
router.get("/", async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      include: [{ model: User }],
    });

    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render("all-posts", { posts });
  } 
    catch (err) {
    res.status(500).json(err);
  }
});

// Get single post
router.get("/posts/:id", async (req, res) => {
  try {
   
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [{ model: User }, { model: Comment, include: [User] }],
    });
    const posts = dbPostData.get({ plain: true });
    console.log(posts)
    res.render("comment", 
    { ...posts, loggedIn: req.session.loggedIn });
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("login");
});

// Sign Up route
router.get("/sign-up", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/dashboard");
    return;
  }
  res.render("sign-up");
});

module.exports = router;