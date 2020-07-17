const User = require('../models/User');
const Product = require('../models/Product');

module.exports = {
  async createProduct(req, res, next) {
    const { user_id } = req.params;
    const checkUserId = await User.findByPk(user_id);
    if (checkUserId.length === 0) {
      return res.status(400).json('Usuário inexistente.');
    }
    return next();
  },

  async updateProduct(req, res, next) {
    const { id } = req.params;
    const checkProductId = await Product.findByPk(id);
    if (checkProductId.length === 0) {
      return res.status(400).json('Produto inexistente.');
    }
    return next();
  },
};
