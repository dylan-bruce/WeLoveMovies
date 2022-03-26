const router = require('express').Router();
const controller = require('./movies.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

router
    .route('/')
    .get(controller.list)
    .all(methodNotAllowed);

router
    .route('/:movieId')
    .get(controller.readId)
    .all(methodNotAllowed);

router
    .route('/:movieId/theaters')
    .get(controller.moviesPlaying)
    .all(methodNotAllowed);

router
    .route('/:movieId/reviews')
    .get(controller.readReviews)
    .all(methodNotAllowed);


module.exports = router;