const knex = require("../db/connection");

function list(isShowing) {
    if (isShowing) {
        return knex("movies as m")
            .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
            .distinct("mt.movie_id")
            .select("m.*")
            .where({ is_showing: true });
    }
    return knex("movies")
        .select("*");
}

module.exports = {
    list,
};