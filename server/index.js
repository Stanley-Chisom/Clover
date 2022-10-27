const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const port = 8080;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "$tanleyChi$om042",
  database: "books_crud",
});

// Middleware
app.use(express.json());
app.use(cors());

// app.get("/books", (req, res) => {
//   const query = "SELECT * FROM books";
//   connection.query(query, (error, result) => {
//     if (error) {
//       return res.json(error);
//     } else {
//       return res.json(result);
//     }
//   });
// });

app.post("/books", (req, res) => {
  const query =
    "INSERT INTO books (`title`, `author`, `plot`, `book_cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.author,
    req.body.plot,
    req.body.book_cover,
  ];
  connection.query(query, [values], (error, result) => {
    if (error) {
      return res.json(error);
    } else {
      return res.json("Book has been created successfully");
    }
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(port, () => {
  console.log("Connected to backend.");
});
