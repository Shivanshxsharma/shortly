const { getuser } = require("../service/auth");
 
 
 async function restrictToLoggedinUser(req,res,next) {
    console.log("🔐 Checking login middleware...");
    const userUID=req.cookies?.uid;
    if(!userUID){
         console.log("loop1")
        return res.redirect("/login");
    }
       const user=getuser(userUID);
       if(!user){
         console.log("loop2")
        return res.redirect("/login");
       }

       req.user=user;
       next();
    
 }


 async function redirectToHomeIfLoggedIn(req,res,next) {
   const userUID=req.cookies?.uid;
    if(userUID){
      const user=getuser(userUID);
      if(user){
         return res.redirect('/');
      }
    }

    next();
 }

 module.exports={
    restrictToLoggedinUser,
    redirectToHomeIfLoggedIn
 }


