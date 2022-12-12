const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get('/:id', userController.getUser);
router.get('/', userController.getAllUsers)
router.put('/:id', ensureAuth,  userController.updateUser)
router.delete('/:id', ensureAuth,  userController.deleteUser)
router.put('/follow/:id', ensureAuth,  userController.followUser)
router.put('/:id/unfollow', ensureAuth,  userController.unfollowUser)



module.exports = router;