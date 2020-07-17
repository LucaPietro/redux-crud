const crypto = require('crypto');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },

  async create(req, res) {
    const { username, name, email, password } = req.body;
    const hasPass = crypto.createHmac('sha256', password).digest('hex');

    const user = await User.create({ username, name, email, password: hasPass });

    return res.json(user);
  },
};
