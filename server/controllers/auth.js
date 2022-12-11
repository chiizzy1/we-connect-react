const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
// const jwt = require("jsonwebtoken");

// exports.getLogin = (req, res) => {
//   if (req.user) {
//     return res.redirect("/feed");
//   } 
//   res.render("login", { title: "Login", user: req.user});
// };

exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    return res.status(400).send({
      message: validationErrors,
      error,
    });
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).send({
        message: "User does not exist",
      });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      //   create JWT token
      // const token = jwt.sign(
      //   {
      //     userId: user._id,
      //     userEmail: user.email,
      //   },
      //   "RANDOM-TOKEN",
      //   { expiresIn: "24h" }
      // );

      req.session.name = req.body.email;

      res.status(200).send({
        message: "Login Successful",
        user: user,
      })
      // res.send(user);
    });
  })(req, res, next);
};


// exports.getSignup = (req, res) => {
//     if (req.user) {
//       return res.redirect("/profile");
//     }
//     res.render("signup", {
//       title: "Create Account",
//     });
//   };
  
exports.postSignup = (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({
        msg: "Password must be at least 8 characters long",
      });
    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: "Passwords do not match" });
  
    if (validationErrors.length) {
      return res.status(400).json({
        message: validationErrors,
        error,
      });
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });
    
    const user = new User(req.body);
  
    User.findOne(
      { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
      (err, existingUser) => {
        if (err) {
          return next(err);
        }
        if (existingUser) {
          return res.status(500).json({
            message: "Account with that email address or username already exists.",
          });
        }
        user.save((err) => {
          if (err) {
            return next(err);
          }
          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }
            res.status(201).json({
              message: "User Created Successfully",
              user,
            });
          });
        });
      }
    );
  };

// exports.logout = (req, res) => {
//     req.logout(() => {
//       console.log('User has logged out.')
//     })
//     req.session.destroy((err) => {
//       if (err)
//         console.log("Error : Failed to destroy the session during logout.", err);
//       req.user = null;
//       res.redirect("/");
//     });
// };

exports.logout = (req,res) => {
  req.session.destroy();
  res.send('successfully loged out');
};