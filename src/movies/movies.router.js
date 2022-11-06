const router = require("express").Router();
const controller = require("./movies.controller");
const theatersRouter = require("../theaters/theaters.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.use(":/movieId/theaters", controller.validateMovieId, theatersRouter);

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

module.exports = router;