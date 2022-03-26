const reviewsService = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

function hasId(req, res, next) {
    reviewsService
        .read(req.params.reviewId)
        .then((review) => {
            if(review) {
                res.locals.review = review;
                return next();
            }
            next({ status: 404, error: 'Review cannot be found.' })
        })
    .catch(next);
}

async function destroy(req, res) {
  await reviewsService.destroy(res.locals.review.review_id);
  res.sendStatus(204);
}

async function update(req, res) {
  const updatedReview = { ...res.locals.review, ...req.body.data };
  await reviewsService.update(updatedReview);
  const returnData = await reviewsService.updateCritics(res.locals.review.review_id);
  res.json({ data: returnData });
}

module.exports = {
  delete: [asyncErrorBoundary(hasId), asyncErrorBoundary(destroy)],
  update: [asyncErrorBoundary(hasId), asyncErrorBoundary(update)],
};