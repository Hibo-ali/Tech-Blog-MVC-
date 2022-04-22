const router = require("express").Router();

const postRoutes = require("./post-routes");
const userRoutes = require("./user-routes");
const commentRoutes = require("./comment-routes");

router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/users", userRoutes);

module.exports = router;