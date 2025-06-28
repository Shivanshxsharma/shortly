const express = require("express");
const app = express();
const path =require("path");
const { connectmdb } = require("./connection");
const urlRoutes = require("./routes/url");
const redirectRoutes = require("./routes/redirect");
const home=require("./routes/homerouter");
const cookieParser=require("cookie-parser"); // important 
const { restrictToLoggedinUser } = require("./middlewares/restrictToLoggedinUser");
connectmdb("mongodb://localhost:27017/shortly")
  .then(() => console.log("Connected to MongoDB"));

app.use(express.json());
app.use(express.urlencoded({extended:false})); // Now it's actually used
const session = require("express-session");
const userRouter = require("./routes/user");

app.use(cookieParser());
app.use(session({
  secret: "your-secret",
  resave: false,
  saveUninitialized: true,
}));
// API routes under /url
app.use("/url",restrictToLoggedinUser, urlRoutes);
app.use("/",userRouter);
app.set("view engine",'ejs');
app.set('views',path.resolve('./views'));
// Redirection at root level
app.use("/",home);
app.use("/", redirectRoutes);

app.listen(7000, () => console.log("SERVER STARTED on port 7000"));
