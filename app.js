const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

// Create and connect to the SQLite database
const db = new sqlite3.Database("./registration.db", (err) => {
  if (err) {
    console.error("Database opening error: ", err.message);
  }
});

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

// Create the users table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    preference TEXT NOT NULL,
    certification TEXT,
    class_type TEXT
  );
`);

// Serve the HTML form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Handle Certification form submission
app.post("/submit-certification", (req, res) => {
  const { firstName, lastName, email, phone, certificationChoice, classType } =
    req.body;
  const preference = "Certification";

  // Insert the form data into the SQLite database
  db.run(
    `INSERT INTO users (first_name, last_name, email, phone, preference, certification, class_type) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      firstName,
      lastName,
      email,
      phone,
      preference,
      certificationChoice,
      classType,
    ],
    function (err) {
      if (err) {
        console.error("Error inserting data: ", err.message);
        return res.status(500).send("Internal Server Error");
      }
      res.send(`
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Thank You</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
          </head>
          <body>
            <div class="container mt-5">
              <h1>Thank you for registering for ${certificationChoice}!</h1>
              <p>We have received your submission.</p>
              <p><strong>Class Type:</strong> ${classType}</p>
              <a href="/" class="btn btn-primary">Go Back</a>
            </div>
          </body>
        </html>
      `);
    }
  );
});
