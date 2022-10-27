const router = require('express').Router();
const { celebrateLogin, celebrateCreateUser } = require('../constants');
const routerUser = require('./users');
const routerMovie = require('./movies');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', celebrateLogin, login);

router.post('/signup', celebrateCreateUser, createUser);

router.use(auth);

router.use('/users', routerUser);

router.use('/movies', routerMovie);

router.use('/', (req, res, next) => {
  next(new NotFoundError('Данная страница не найдена'));
});

module.exports = router;
