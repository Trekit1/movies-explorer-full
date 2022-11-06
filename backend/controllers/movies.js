const Movie = require('../models/movie');

const ValidError = require('../errors/ValidError');
const NotFoundError = require('../errors/NotFoundError');
const NotAccessError = require('../errors/NotAccessError');

module.exports.getAllUserMovie = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies.reverse()))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    owner: req.user._id,
    movieId,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidError('Переданы некорректные данные в методы создания фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundError('Данный фильм не существует');
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send({ message: 'Фильм удалён' });
          })
          .catch(next);
      } else {
        throw new NotAccessError('Нет прав для удаления фильма');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidError('Передан некорректный id фильма'));
      } else {
        next(err);
      }
    });
};
