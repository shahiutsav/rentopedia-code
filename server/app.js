const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json());

// Route imports
const book = require("./routes/bookRoute");
const user = require("./routes/userRoute");

app.use("/api/v1", book);
app.use("/api/v1", user);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
