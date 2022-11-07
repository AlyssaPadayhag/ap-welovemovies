const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

/* GET /movies 
   GET /movies?is_showing=true 
- list all movies or movies currently showing in theaters */
async function list(req, res, next) {
    const { is_showing = false } = req.query;
    res.json({ data: await service.list(Boolean(is_showing)) });
}

/* validate existing movie (paramter movie_id === movie_id in database)
   if no Id matches, GET /movies/:movieId (incorrect ID), next 404 */
async function validateMovieId(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    return next({
        status: 404,
        message: "Movie cannot be found."
    });
}

// GET /movies/:movieId - get an existing movie
async function read(req, res, next) {
    const { movie } = res.locals;
    res.json({ data: movie });
}

// GET /movies/:movieId/theaters - get all theaters movie is showing in
async function readTheaters(req, res, next) {
    const { movie_id } = res.locals.movie;
    const theaters = await service.readTheaters(movie_id);
    res.json({ data: theaters });
}

// GET /movies/:movieId/reviews - get all reviews for movie
async function readReviews(req, res, next) {
    const { movie_id } = res.locals.movie;
    const reviews = await service.readReviews(movie_id);
    
    for(let review of reviews) {
        const critic = await service.readCritic(review.critic_id);
        review["critic"] = critic;
    }

    res.json({ data: reviews });
}

module.exports = {
    list: [asyncErrorBoundary(list)],
    validateMovieId,
    read: [asyncErrorBoundary(validateMovieId), read],
    readTheaters: [asyncErrorBoundary(validateMovieId), readTheaters],
    readReviews: [asyncErrorBoundary(validateMovieId), readReviews],

};