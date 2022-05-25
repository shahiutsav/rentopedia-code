const express = require("express");
const app = express();

app.use(express.json());

// Route imports
const book = require("./routes/bookRoute");

app.use("/api/v1", book);

module.exports = app;
