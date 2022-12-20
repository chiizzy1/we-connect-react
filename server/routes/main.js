const express = require("express");
const router = express.Router();
// const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
const postsController = require("../controllers/posts")
const { ensureAuth, ensureGuest } = require("../middleware/auth");



//Main Routes - simplified for now
// router.get("/", (req, res) =>{
//     res.send("Hello world")
// });
// Login
// router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
// Sign up
// router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
// Profile page
router.get("/profile", postsController.getProfile);
// Feeds page
router.get("/feed", postsController.getFeed);
// Logout Page
// router.get("/logout", authController.logout);

module.exports = router