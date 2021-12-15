const express = require("express");
const res = require("express/lib/response");
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
  database: "media_social",
});

// menjalankan SQL - table posts
// create
app.post("/posts", (req, res) => {
  let sql =
    "INSERT INTO posts SET post_date=NOW()" +
    ", username='" +
    req.body.username +
    "', post='" +
    req.body.post +
    "'";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ status: 200, message: "data berhasil disimpan", data: null });
  });
});

app.get("/posts", (req, res) => {
  let sql =
    "SELECT post_id, username, post, DATE_FORMAT(post_date, '%W %D %M %Y %H:%i') as post_date FROM posts";
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json({ status: 200, message: "data berhasil di- GET", data: results });
  });
});

app.listen(port, () => {
  console.log(`cli-nodejs-api listening at http://localhost:${port}`);
});
