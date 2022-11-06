const bcrypt = require('bcryptjs');

const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');

const User = require('../models/user');

const ValidError = require('../errors/ValidError');
const ConflictError = require('../errors/ConflictError');

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(' Пользователь с таким логином уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new ValidError('Переданы некорректные данные в методы создания пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => {
      res.send({
        name: user.name, email: user.email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(' Пользователь с таким логином уже существует'));
      } else if (err.name === 'ValidationError') {
        next(new ValidError('Переданы некорректные данные в методы создания пользователя'));
      } else {
        next(err);
      }
    });
};
