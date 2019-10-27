const express = require("express");
const bParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const port = require("../configs/server-cfg").localPort;//3008
const ctrl = require("./ctrl");

const app = express();
app.use(bParser.json());
app.use(bParser.urlencoded({ extended: true }));
app.use(cors());
// app.use("/", express.static(path.join(__dirname, "../client/dist")));
app.listen(port, () => {
  console.log("module Forest server online:" + port);
});


app.get("/ab", ctrl.ab);
app.get("/sc/:type", ctrl.sc);