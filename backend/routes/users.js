const routerUser = require('express').Router();
const { celebrateUpdateInfo } = require('../constants');

const { getUserInfo } = require('../controllers/users');
const { updateUserInfo } = require('../controllers/users');

routerUser.get('/me', getUserInfo);
routerUser.patch('/me', celebrateUpdateInfo, updateUserInfo);

module.exports = routerUser;
