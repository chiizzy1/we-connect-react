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
    const { _id, currentUserAdmin, password } = req.body;
    
    if (id === _id) {
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
      //     { username: user.username, id: user._id },
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
    const { _id } = req.body;
    console.log(id, _id)
    if (_id == id) {
      res.status(403).json("Action Forbidden");
    } else {
      try {
        const followUser = await User.findById(id);
        const followingUser = await User.findById(_id);
  
        if (!followUser.followers.includes(_id)) {
          await followUser.updateOne({ $push: { followers: _id } });
          await followingUser.updateOne({ $push: { following: id } });
          res.status(200).json("User followed!");
        } else {
          res.status(403).json("you are already following this id");
        }
      } catch (error) {
        console.log(error)
        res.status(500).json(error);
      }
    }
  },
  unfollowUser: async (req, res) => {
    const id = req.params.id;
    const { _id } = req.body;
  
    if(_id === id)
    {
      res.status(403).json("Action Forbidden")
    }
    else{
      try {
        const unFollowUser = await User.findById(id)
        const unFollowingUser = await User.findById(_id)
  
  
        if (unFollowUser.followers.includes(_id))
        {
          await unFollowUser.updateOne({$pull : {followers: _id}})
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



