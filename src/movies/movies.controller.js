const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const { is_showing = false } = req.query;
    res.json({ data: await service.list(Boolean(is_showing)) });
}

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

async function read(req, res, next) {
    const { movie } = res.locals;
    res.json({ data: movie });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(validateMovieId), read],
    validateMovieId,
};