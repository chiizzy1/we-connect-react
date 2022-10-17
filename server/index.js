import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import passport from "passport";
import session from "express-session";
import logger from "morgan"
import MongoStore from "connect-mongo";
import methodOverride from "method-override";
import flash from "express-flash";
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
// const postRoutes = require("./routes/posts");
// const commentRoutes = require("./routes/comments");
// const editRoutes = require("./routes/edit")


const app = express();

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

// Use Cors
app.use(cors());

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.DB_STRING
    })
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
// app.use("/post", postRoutes);
// app.use("/comment", commentRoutes);
// app.use("/edit", editRoutes);

//Server Running
app.listen(process.env.PORT, () => {
  console.log("Server is running, you better catch it!");
});