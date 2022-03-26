const moviesService = require('./movies.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');


function hasId(req, res, next) {
    moviesService
        .readId(req.params.movieId)
        .then((movie) => {
            if(movie) {
                res.locals.movie = movie;
                return next();
            }
            next({ status: 404, error: 'Movie cannot be found.' })
        })
    .catch(next);
}

function list(req, res, next) {
    moviesService
        .list(req.query.is_showing)
        .then((data) => {
          res.json({data})})
        .catch(next);
}

async function readId(req, res) {
     const data = await moviesService.readId(res.locals.movie.movie_id)
     res.json({ data })
}

async function moviesPlaying(req, res) {
    const data = await moviesService.moviesPlaying(res.locals.movie.movie_id)
    res.json({ data })
}

async function readReviews(req, res) {
    const data = await moviesService.readReviews(res.locals.movie.movie_id)
    res.json({ data })
}

module.exports = {
    list,
    readId: [asyncErrorBoundary(hasId), asyncErrorBoundary(readId)],
    moviesPlaying: [asyncErrorBoundary(hasId), asyncErrorBoundary(moviesPlaying)],
    readReviews: [asyncErrorBoundary(hasId), asyncErrorBoundary(readReviews)],
}