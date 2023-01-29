const sqlite3 = require("sqlite3").verbose();

const DATA_SOURCE = "../db.sqlite3";

let db = new sqlite3.Database(DATA_SOURCE, (error) => {
  if (error) {
    console.error(error);
    throw new Error("Connect failed");
  } else {
    console.log("Connect success");

    db.run(
      `CREATE TABLE todo (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task TEXT
    )`,
      (err) => console.log("Error occurs when try to create table", err)
    );
  }
});

module.exports = db;
