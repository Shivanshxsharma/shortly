const express=require("express");
const { Signup, login } = require("../controllers/user");
const userRouter=express();
userRouter.post('/signup',Signup);
userRouter.post('/login',login);
module.exports=userRouter;