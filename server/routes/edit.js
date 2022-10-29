const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const editController = require("../controllers/edit");
// const { ensureAuth, ensureGuest } = require("../middleware/auth");



//Edit User Profile details

//Edit Routes - simplified for now
// router.get("/:id", ensureAuth, editController.getUser);

// Update User Details
router.put("/editProfile/:id", editController.updateUserDetails);





module.exports = router; 