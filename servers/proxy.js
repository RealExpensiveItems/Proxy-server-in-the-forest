const express = require("express");
const bParser = require("body-parser");
const path = require("path");
const port = 4000;

const app = express();
app.use(bParser.json());
app.use(bParser.urlencoded({ extended: true }));
app.use("/", express.static(path.join(__dirname, "./index.html")));
app.listen(port, () => {
  console.log("Proxy server online:" + port);
});

