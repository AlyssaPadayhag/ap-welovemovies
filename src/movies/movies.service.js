const knex = require("../db/connection");

// select from movies: list all movies currently showing, else list all movies
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

// select from movies where movie_id exists in the database
function read(movieId) {
    return knex("movies")
        .select("*")
        .where({ movie_id: movieId })
        .first();
}

// select from movie theaters, join theaters where movie is playing at theater
function readTheaters(movieId) {
    return knex("movies_theaters as mt")
    .join("theaters as t", "mt.theater_id", "t.theater_id")
    .select("t.*")
    .where({ "mt.movie_id": movieId });
}

// helper service function to create object of critic properties for review
function readCritic(criticId) {
    return knex("critics")
        .select("*")
        .where({ critic_id: criticId })
        .first();
}

// select from reviews where movie_id exists in database
function readReviews(movieId) {
    return knex("reviews")
        .select("*")
        .where({ movie_id: movieId });
}

module.exports = {
    list,
    read,
    readTheaters,
    readCritic,
    readReviews,
};