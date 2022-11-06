const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const { is_showing = false } = req.query;
    res.json({ data: await service.list(Boolean(is_showing)) });
}

module.exports = {
    list: asyncErrorBoundary(list),
};