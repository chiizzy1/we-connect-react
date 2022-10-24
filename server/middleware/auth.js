const jwt = require("jsonwebtoken");

module.exports =  {
    ensureAuth: async (request, response, next) => {
      try {
          //   get the token from the authorization header
          const token = await request.headers.authorization.split(" ")[1];

          //check if the token matches the supposed origin
          const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");

          // retrieve the user details of the logged in user
          const user = await decodedToken;

          // pass the user down to the endpoints here
          request.user = user;

          // pass down functionality to the endpoint
          next();

      } catch (error) {
          response.status(401).json({
              error: new Error("Invalid request!"),
            });
      }
    }

}




// module.exports = {
//     ensureAuth: function (req, res, next) {
//       if (req.isAuthenticated()) {
//         return next();
//       } else {
//         res.send("Please Login");
//       }
//     },
//     ensureGuest: function (req, res, next) {
//       if (!req.isAuthenticated()) {
//         return next();
//       } else {
//         res.redirect("/dashboard");
//       }
//     },
// };