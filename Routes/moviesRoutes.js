const express = require('express')
const moviesController = require('../Controllers/moviesController')

const Router = express.Router();

// Router.param('id',moviesController.checkId)

Router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.validateBody,moviesController.createMovie)//chaining of middlewares

Router.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie)

module.exports = Router