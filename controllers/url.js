const { nanoid } = require('nanoid');
const {URL}=require("../models/url");
const session = require("express-session");

async function genShortURL(req,res) {
const body = req.body;
const n = parseInt(body.codeLength);  // Convert string to number
const shortId = nanoid(n);
   if (!body.originalUrl || body.originalUrl.trim() === "") {
    req.session.error = "URL is required";
    return res.redirect("/");
}

    const user=req.user;
    await URL.create({
        shortId: shortId,
        redirectURL:body.originalUrl,
        visithistory:[],
        createdBy:user.email,
    })
req.session.shorturl = `https://shortly-jogp.onrender.com/${shortId}`;
req.session.id = shortId;
return res.redirect("/");

}

async function clicks(shortId) {
    const doc = await URL.findOne({ shortId: shortId });
  if (!doc) {
    return res.status(404).send("Short URL not found1");
  }

  const his = doc.visithistory || [];
  const c = his.length;
   return res.send(c);
}



async function handleRedirect(req, res) {
  console.log("hi from generatioon")
  const doc = await URL.findOneAndUpdate(
    { shortId: req.params.shortid },
    { $push: { visithistory: { timestamp: new Date() } } },
    { new: true }
  );

  if (!doc) return res.status(404).send("Short URL not found");

  res.redirect(doc.redirectURL);
}


module.exports={genShortURL,clicks,handleRedirect};


