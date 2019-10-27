const express = require("express");
const bParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const expresser = (port,proxy)=>{
  const app=express();
  app.use(bParser.json());
  app.use(bParser.urlencoded({ extended: true }));
  app.listen(port, () => {console.log(":"+port+" listening" );});
  if(proxy)
    app.use("/", express.static(path.join(__dirname, "./servers")));
  else
    app.use(cors());
  return app;
}
/////proxy/////
const proxy = expresser(4000,true);

/////forest/////
const ctrlForest = require("./servers/forest/server/ctrl");
const forest = expresser(3008);
forest.get("/ab", ctrlForest.ab);
forest.get("/sc/:type", ctrlForest.sc);

/////jiyoon/////
const controllerJiyoon = require('./servers/jiyoon/server/controller');
const jiyoon = expresser(3002);
jiyoon.get('/api/reviews/:id', controllerJiyoon.getProductReviews);
jiyoon.get('/api/reviewImg/:id', controllerJiyoon.getReviewImgInfo);
jiyoon.get('/api/helpfulReviews/:id', controllerJiyoon.addHelpfulCount);
jiyoon.get('/api/unhelpfulReviews/:id', controllerJiyoon.addUnhelpfulCount);

/////ryan/////
/////daylan/////
/////daniel/////