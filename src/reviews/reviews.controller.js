const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/* validate existing review (paramter review_id === review_id in database)
   if no Id matches, UPDATE /reviews/:reviewId (incorrect ID), next 404 */
async function validateReviewId(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    return next({
        status: 404,
        message: "Review cannot be found"
    });
}

// UPDATE /reviews/:reviewId - update an existing review
async function update(req, res, next) {
    const review = res.locals.review.review_id;
    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    await service.update(updatedReview);
    res.json({ data: await service.read(review) });
}

// DELETE /reviews/:reviewId - delete an existing review
// send 204 if given Id does not match an existing review
async function destroy(req, res, next) {
    const { review } = res.locals;
    await service.destroy(review.review_id);
    res.sendStatus(204);
}

module.exports = {
    update: [asyncErrorBoundary(validateReviewId), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(validateReviewId), asyncErrorBoundary(destroy)],
}