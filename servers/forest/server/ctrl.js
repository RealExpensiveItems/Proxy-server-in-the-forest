const db = require("../db");
const abData = require("../configs/server-cfg").dbInfo.abTableName;
const typeData = require("../configs/server-cfg").dbInfo.typeTableName;
// const devMode = require("../configs/server-cfg").devMode;

const getRandom = () => {
  var arr = [];
  var nums = []; //without duplicate
  for (var i = 0; i < 128; i++) nums[i] = i + 1; //to match database id
  for (var i = 0; i < 10; i++) {
    var temp = Math.floor(Math.random() * (128 - i));
    arr[i] = nums[temp];
    nums[temp] = nums[128 - 1 - i];
  }
  return arr;
};

module.exports = {
  ab: (req, res) => {
    var resArr = [];
    getRandom().map(id => {
      db.query(
        `SELECT * FROM ${abData} WHERE ${abData}.id=${id};`,
        (err, result) => {
          if (err) res.status(400).send(err);
          else {
            resArr.push(result[0]);
            // if (devMode)
            //   resArr[resArr.length - 1].img =
            //     "https://hsm.utimaco.com/wp-content/uploads/2017/09/Applications_Grey_RGB_Random_Number_Generation-300x300.png";
            if (resArr.length === 10) res.status(200).send(resArr);
          }
        }
      );
    });
  },

  sc: (req, res) => {
    db.query(
      // to fit the type name ryan provided
      `SELECT * FROM ${typeData} WHERE ${typeData}.typename="${req.params.type}";`,
      (err, info) => {
        if (err) res.status(400).send(err);
        else{
          if(!info[0]) res.status(200).send();
          else
            db.query(`SELECT * FROM ${info[0].tablename};`, (err, table) => {
              if (err) res.status(400).send(err);
              else
                res.status(200).send({
                  sizingNotes: info[0].sizing_notes,
                  table: table
                });
            });
        }
      }
    );
  }
};
