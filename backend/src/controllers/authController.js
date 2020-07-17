const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  async create(req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json('Usuário ou senha inválidos');
    }

    const user = await User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      return res.status(400).json('Usuário ou senha inválidos');
    }

    const encryptPass = crypto.createHmac('sha256', password).digest('hex');
    if (user.dataValues.password !== encryptPass) {
      return res.status(400).json('Usuário ou senha inválidos');
    }

    const token = jwt.sign({ username, user_id: user.dataValues.id }, 'secret');

    return res.json({
      user_id: user.dataValues.id,
      username,
      token,
    });
  },
};
