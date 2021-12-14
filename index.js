const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// koneksi database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "social_media",
});

app.get("/connection", (req, res) => {
  db.connect(function (err) {
    if (err) {
      res.json({ status: 200, message: "Koneksi gagal dilakukan.", data: err });
    } else {
      res.json({ status: 200, message: "Koneksi berhasil dilakukan." });
    }
  });
});

// create
app.post("/users", (req, res) => {
  let sql =
    "INSERT INTO users SET username='" +
    req.body.username +
    "', password=password('" +
    req.body.password +
    "'), fullname='" +
    req.body.fullname +
    "', picture='" +
    req.body.picture +
    "'";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ status: 200, error: null, response: results, data: req.body });
  });
});

app.listen(port, () => {
  console.log(`cli-nodejs-api listening at http://localhost:${port}`);
});
