const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());

// Route imports
const book = require("./routes/bookRoute");

app.use("/api/v1", book);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
