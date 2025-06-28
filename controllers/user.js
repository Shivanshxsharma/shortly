const {User}=require("../models/user");
const {setuser}=require("../service/auth");
const {v4:uuidv4}=require("uuid");

async function Signup(req,res) {
    const{name, email, password ,confirmPassword}=req.body;
    if(!name||!email||!password||!confirmPassword){
        return res.status(404).send("fill all the deatails");
    }
    if(password!=confirmPassword){
        return res.status(404).send("password not matched");
    }
 await  User.create({
      name,
      email,
      password,
      confirmPassword,

    });

    const user={
        email,
        password
    }

    const token= setuser(user);
    res.cookie("uid",token);


    return res.redirect("/");

}
async function login(req,res) {
    const{email, password}=req.body;
      console.log("Login attempt:", email, password);
    if(!email||!password){
        return res.status(404).send("fill all the deatails2");
    }
    const check= await User.findOne(
        {email:email,password:password});

        if (!check) {
        return res.status(404).send("user not found");
        }    
       const token= setuser(check);
        res.cookie("uid",token);


    return res.redirect("/");

}

module.exports={
    Signup,login
};