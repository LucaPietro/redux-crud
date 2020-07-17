const allRoutes = require('express').Router();
const users = require('./users');
const products = require('./products');
const auth = require('./auth');

allRoutes.use(users, products, auth);

module.exports = allRoutes;
