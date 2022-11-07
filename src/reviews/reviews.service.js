const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

// helper service function to create pbject of critic properties for review
const criticsInfo = mapProperties({
    c_critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    c_created_at: "critic.created_at",
    c_updated_at: "critic.updated_at",
});

// select from reviews, join critics, where review_id exists, then add critics info object
function read(review_id) {
    return knex("reviews as r")
      .join("critics as c", "c.critic_id", "r.critic_id")
      .select(
        "r.*",
        "c.critic_id as c_critic_id",
        "c.preferred_name",
        "c.surname",
        "c.organization_name",
        "c.created_at as c_created_at",
        "c.updated_at as c_updated_at"
      )
      .where({ review_id })
      .first()
      .then(criticsInfo);
  };

  // select from reviews, where review_id exists, update existing review
function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview);
}

// seelct from reviews, where review_id exists, delete review
function destroy(reviewId) {
    return knex("reviews")
        .where({ review_id: reviewId })
        .del();
}

module.exports = {
    read,
    update,
    destroy,
}
