if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const moviesRouter = require("./movies/movies.router");
const notFound = require("./errors/routeNotFound");
const errorHandler = require("./errors/routeErrorHandler");


app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);

// route not found and route error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
