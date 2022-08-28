const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");

app.use(bodyParser.json());

const conn = mysql.createConnection({
  host: "localhost",
  user: "root" /* MySQL User */,
  password: "" /* MySQL Password */,
  database: "node_sql" /* MySQL Database */,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("Mysql Connected with Application...");
});

// Get all items
app.get("/api/items", (req, res) => {
  let sqlQuery = "SELECT * FROM items";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

// Get single item
app.get("/api/items/:id", (req, res) => {
  let sqlQuery = "SELECT * FROM items WHERE id=" + req.params.id;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

// Create new item
app.post("/api/items", (req, res) => {
  let data = { title: req.body.title, body: req.body.body };

  let sqlQuery = "INSERT INTO items SET ?";

  let query = conn.query(sqlQuery, data, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

// Update an item
app.put("/api/items/:id", (req, res) => {
  let sqlQuery =
    "UPDATE items SET title='" +
    req.body.title +
    "', body='" +
    req.body.body +
    "' WHERE id=" +
    req.params.id;

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

// Delete an item
app.delete("/api/items/:id", (req, res) => {
  let sqlQuery = "DELETE FROM items WHERE id=" + req.params.id + "";

  let query = conn.query(sqlQuery, (err, results) => {
    if (err) throw err;
    res.send(apiResponse(results));
  });
});

// API response config
function apiResponse(results) {
  return JSON.stringify({ status: 200, error: null, response: results });
}

app.listen(3000, () => {
  console.log("Server started on port 3000...");
});
