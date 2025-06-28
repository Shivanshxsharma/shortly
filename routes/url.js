const express = require("express");
const router = express.Router();
const { genShortURL, clicks } = require("../controllers/url");

// All under /url

router.post("/", genShortURL);
router.get("/analytics/:shortid", clicks);

module.exports = router;
