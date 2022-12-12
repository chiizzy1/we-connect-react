const Comment = require("../models/Comment");
const User = require("../models/User");
const bcrypt = require("bcrypt");


// import jwt from 'jsonwebtoken'

module.exports = {
  getUser: async (req, res) => {
    const id = req.params.id;
  
    try {
      const user = await User.findById(id);
      if (user) {
        const { password, ...otherDetails } = user._doc;
  
        res.status(200).json(otherDetails);
      } else {
        res.status(404).json("No such User");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllUsers: async (req, res) => {

    try {
      let users = await User.find();
      users = users.map((user)=>{
        const {password, ...otherDetails} = user._doc
        return otherDetails
      })
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    const id = req.params.id;
    // console.log("Data Received", req.body)
    const { userId, currentUserAdmin, password } = req.body;
    
    if (id === userId) {
      try {
        // if we also have to update password then password will be bcrypted again
        if (password) {
          const salt = await bcrypt.genSalt(10);
          req.body.password = await bcrypt.hash(password, salt);
        }
        // have to change this
        const user = await User.findByIdAndUpdate(id, req.body, {
          new: true,
        });
      //   const token = jwt.sign(
      //     { username: user.username, id: user.userId },
      //     process.env.JWTKEY,
      //     { expiresIn: "1h" }
      //   );
      //   console.log({user, token})
        res.status(200).json(user);
      } catch (error) {
        console.log("Error!!")
        res.status(500).json(error);
      }
    } else {
      res
        .status(403)
        .json("Access Denied! You can update only your own Account.");
    }
  },
  deleteUser: async (req, res) => {
    const id = req.params.id;
  
    const { currentUserId, currentUserAdmin } = req.body;
  
    if (currentUserId == id || currentUserAdmin) {
      try {
        await User.findByIdAndDelete(id);
        res.status(200).json("User Deleted Successfully!");
      } catch (error) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Access Denied!");
    }
  },
  followUser: async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
    console.log(id, userId)
    
    if (userId == id) {
      res.status(403).json("Action Forbidden");
    } else {
      try {
        const followUser = await User.findById(id);
        const followingUser = await User.findById(userId);
  
        if (!followUser.followers.includes(userId)) {
          await followUser.updateOne({ $push: { followers: userId } });
          await followingUser.updateOne({ $push: { following: id } });
          res.status(200).json("User followed!");
        } else {
          await followUser.updateOne({ $pull: { followers: userId } });
          await followingUser.updateOne({ $pull: { following: id } });
          res.status(200).json("User Unfollowed!");
        }
      } catch (error) {
        console.log(error)
        res.status(500).json(error);
      }
    }
  },
  unfollowUser: async (req, res) => {
    const id = req.params.id;
    const { userId } = req.body;
  
    if(userId === id)
    {
      res.status(403).json("Action Forbidden")
    }
    else{
      try {
        const unFollowUser = await User.findById(id)
        const unFollowingUser = await User.findById(userId)
  
  
        if (unFollowUser.followers.includes(userId))
        {
          await unFollowUser.updateOne({$pull : {followers: userId}})
          await unFollowingUser.updateOne({$pull : {following: id}})
          res.status(200).json("Unfollowed Successfully!")
        }
        else{
          res.status(403).json("You are not following this User")
        }
      } catch (error) {
        res.status(500).json(error)
      }
    }
  },

}



