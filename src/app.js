if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");
const notFound = require("./errors/routeNotFound");
const errorHandler = require("./errors/routeErrorHandler");


app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theatersRouter);
app.use("/reviews", reviewsRouter);

// route not found and route error handler
app.use(notFound);
app.use(errorHandler);

module.exports = app;
