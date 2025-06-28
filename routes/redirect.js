const express = require("express");
const router = express.Router();
const { handleRedirect } = require("../controllers/url");

router.get("/:shortid", handleRedirect);

module.exports = router;
