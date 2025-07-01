const express = require("express");
const cors = require("cors");
const router = require("./routers/router");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
