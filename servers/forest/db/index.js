const mysql = require("mysql");
const db = require("../configs/server-cfg").dbInfo;
var con = mysql.createConnection({
  host: "localhost",
  user: db.user,
  password: db.password,
  database: db.dbName
});

con.connect(err => {
  if (err) throw err;
  console.log("module forest db is running");
});

module.exports = con;
