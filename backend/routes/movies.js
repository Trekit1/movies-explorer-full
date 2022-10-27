const routerMovie = require('express').Router();
const { celebrateDeleteMovie, celebrateCreateMovie } = require('../constants');

const { getAllUserMovie } = require('../controllers/movies');
const { createMovie } = require('../controllers/movies');
const { deleteMovie } = require('../controllers/movies');

routerMovie.get('/', getAllUserMovie);
routerMovie.post('/', celebrateCreateMovie, createMovie);
routerMovie.delete('/:movieId', celebrateDeleteMovie, deleteMovie);

module.exports = routerMovie;
