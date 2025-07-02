const express = require("express");
const ControllerIAGemini = require("../controllers/controllerIA");
const router = express.Router();

router.post("/explain", ControllerIAGemini.explainWhiteboard);

module.exports = router;
