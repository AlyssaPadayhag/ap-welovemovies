const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// GET /theaters - list all theaters, and the movies playing at each theater
async function list(req, res, next) {
    const theaters = await service.list();
    res.json({ data: theaters });
}

module.exports = {
    list,
};