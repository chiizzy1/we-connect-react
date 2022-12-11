const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, unique: true },
  password: {
    type: String,    
    require: true,    
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,    
    require: false,    
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profilePic: String,
  country: String,
  city: String,
  campus: String, 
  sex: String,
  linkedin: String,
  twitter: String,
  mobile: Number,
  description: String,
  followers: [],
  following: [],
  editedAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);