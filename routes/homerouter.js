const express = require("express");
const router = express.Router();
const { genShortURL, clicks } = require("../controllers/url");
const { User } = require("../models/user");
const {URL}=require("../models/url");
const { restrictToLoggedinUser, redirectToHomeIfLoggedIn } = require("../middlewares/restrictToLoggedinUser");

router.get("/",restrictToLoggedinUser, async (req, res) => {
  const shorturl = req.session.shorturl;
  const user=req.user;
  const id = req.session.id;
  const error = req.session.error;
  const allurls= await URL.find({createdBy:user.email});
  // Clear session data after use
  req.session.shorturl = null;
  req.session.id = null;
  req.session.error = null;

  res.render("home", { urls:allurls,shorturl, id, error });
});

router.get("/log-out",(req,res)=>{
    res.clearCookie("uid"); // Name must match the one you set
    res.redirect("/login");
})

router.get('/signup',(req,res)=>{
  return res.render("signup");
})
router.get('/login',redirectToHomeIfLoggedIn,(req,res)=>{
  return res.render("login");
})

module.exports = router;