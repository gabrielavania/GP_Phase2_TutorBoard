const express = require("express");
const ControllerIAGemini = require("../controllers/controllerIA");
const router = express.Router();

router.post("/explain", ControllerIAGemini.explainWhiteboard);

app.get("/", (req, res) => {
  res.send("Socket server is running ✅");
});

module.exports = router;
