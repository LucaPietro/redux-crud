const express = require('express');
const userController = require('../controllers/userController');
const userMiddleware = require('../middlewares/userMiddleware');

const routerSession = express.Router();

routerSession.post('/users', userMiddleware.createUser, userController.create);

module.exports = routerSession;
