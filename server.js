const express = require("express");
const bParser = require("body-parser");
const path = require("path");
const cors= require("cors");
const port = 4000;

const app = express();
app.use(bParser.json());
app.use(bParser.urlencoded({ extended: true }));
// app.use(cors());
app.use("/", express.static(path.join(__dirname, "./index")));
app.listen(port, () => {
  console.log("Proxy server online:" + port);
});

// app.get("/server/test", (req, res) => {
//   console.log("visited");
//   res.status(200).send(":" + port + " is watching you");
// });
