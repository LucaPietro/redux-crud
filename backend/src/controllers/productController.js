const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      include: { association: 'products' },
    });

    return res.json(user.products);
  },

  async create(req, res) {
    const { user_id } = req.params;
    const { title, description, amount, price } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const product = await Product.create({
      title,
      description,
      amount,
      price,
      user_id,
    });

    return res.json(product);
  },

  async update(req, res) {
    const { id } = req.params;
    const { title, description, amount, price } = req.body;
    const { token } = req.headers;
    const decode = jwt.decode(token);

    const product = await Product.update(
      {
        user_id: decode.user_id,
        title,
        description,
        amount,
        price,
      },
      {
        where: {
          id,
        },
      }
    );

    return res.json(product);
  },

  async delete(req, res) {
    const { id } = req.params;
    const product = await Product.destroy({
      where: {
        id,
      },
    });

    return res.json(product);
  },
};
