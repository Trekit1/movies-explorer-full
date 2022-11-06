const { celebrate, Joi } = require('celebrate');

const mongoURL = 'mongodb://localhost:27017/moviesdb';

const reg = /https?:\/\/(www\.)?([a-zA-Z0-9-._~:/?#@!$&'()+,;=]*)\.([a-zA-Z])#?/;

const celebrateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const celebrateUpdateInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const celebrateCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const celebrateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).hex(),
  }),
});

const celebrateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailerLink: Joi.string().required().regex(reg),
    thumbnail: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  reg,
  mongoURL,
  celebrateUpdateInfo,
  celebrateLogin,
  celebrateCreateUser,
  celebrateDeleteMovie,
  celebrateCreateMovie,
};
