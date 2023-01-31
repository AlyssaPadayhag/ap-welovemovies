# Thinkful Capstone: WeLoveMovies
### Backend deplyed app on Heroku - https://ap-welovemovies-backend.onrender.com/movies
WeLoveMovies is a Thinkful Backend Development capstone project.
The frontend experience has been given.
I have been tasked with setting up a database and building out specific routes so that users can gain access to data about movies, theaters, and reviews.

# Endpoints:

## /movies
router.route("/:movieId/reviews")
    .get(controller.readReviews)
    .all(methodNotAllowed);

router.route("/:movieId/theaters")
    .get(controller.readTheaters)
    .all(methodNotAllowed);

router.route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);

## /theaters
router.route("/")
    .get(controller.list)
    .all(methodNotAllowed);
    
## /reviews
 router.route("/:reviewId")
    .put(controller.update)
    .delete(controller.delete)
    .all(methodNotAllowed);

# Technologies used
- PostgreSQL
- Node.js
- Express.js
- Knex.js

# Demonstrated the following
- Install and use common middleware packages
- Receive requests through routes
- Running tests from the CI
- Accesss relevant info through route and query params
- Create an error handler, where route does not exist
- Build API following RESTful design principles
- Create and customize knexfile.js file
- Create a connection to database with Knex
- Write database queries to complete CRUD routes in an Express server
- Return joined and nested data with Knex
- Write database migrations using Knex's migration tools

# Notes
- HTML and CSS files were given and did not need to be edited
- Frontend application was given and did not need to be edited

# Images
Home Page
![This is an image](./images/home.png)
