const express = require('express');
const authController = require('../controllers/authController');

const routerSession = express.Router();

routerSession.post('/auth/login', authController.create);

module.exports = routerSession;
