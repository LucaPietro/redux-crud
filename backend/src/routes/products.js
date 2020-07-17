const express = require('express');
const productController = require('../controllers/productController');
const productMiddleware = require('../middlewares/productMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const routerSession = express.Router();

routerSession.post(
  '/products/:user_id',
  authMiddleware.validate,
  productMiddleware.createProduct,
  productController.create
);

routerSession.get(
  '/products/:user_id',
  authMiddleware.validate,
  productMiddleware.createProduct,
  productController.index
);

routerSession.put(
  '/products/:id',
  authMiddleware.validate,
  productMiddleware.updateProduct,
  productController.update
);

routerSession.delete(
  '/products/:id',
  authMiddleware.validate,
  productMiddleware.updateProduct,
  productController.delete
);

module.exports = routerSession;
