const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const userRoute = require("./routes/user");
const postsRoutes = require("./routes/posts");
const editRoutes = require("./routes/edit")
const commentRoutes = require("./routes/comments");

// app.use(cors({
//   origin: "http://127.0.0.1:5173",
//   methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
//   credentials: true,
//   optionsSuccessStatus: 200,
// }));

// app.set("trust proxy", 1);

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();


//Static Folder
app.use(express.static("dist"));

//Body Parsing
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    name: "usersession",
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_STRING,
        collection: 'UserSessions',
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: false,
    }
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/api", mainRoutes);
app.use('/api/user', userRoute)
app.use("/api/post", postsRoutes);
app.use("/api/edit", editRoutes);
app.use("/api/comment", commentRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});