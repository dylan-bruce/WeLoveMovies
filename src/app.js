if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();

const moviesRouter = require('./movies/movies.router')
const theatersRouter = require('./theaters/theaters.router')
const reviewsRouter = require('./reviews/reviews.router')
app.use(express.json())

app.use('/movies', moviesRouter);
app.use('/theaters', theatersRouter)
app.use('/reviews', reviewsRouter)
app.use((req, res, next) => {
  next({status: 404, error:'Not Found'})
})

app.use((err, req, res, next) => {
  res.status(err.status).json({error: err.error})
})

module.exports = app;
