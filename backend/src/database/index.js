const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Product = require('../models/Product');

const connection = new Sequelize(dbConfig);

User.init(connection);
Product.init(connection);

User.associate(connection.models);
Product.associate(connection.models);

module.exports = connection;
