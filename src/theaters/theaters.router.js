const router = require("express").Router();
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

// route and methods for /theaters
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = router;