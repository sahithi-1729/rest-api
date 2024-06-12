const express = require('express')
const moviesController = require('../Controllers/moviesController')

const Router = express.Router();
Router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.createMovie)

Router.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)

module.exports = Router