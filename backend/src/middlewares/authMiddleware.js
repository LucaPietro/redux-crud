const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  async validate(req, res, next) {
    const { token } = await req.headers;
    const { username, user_id } = jwt.decode(token);
    const checkIfTokenExists = await User.findOne({
      where: {
        id: user_id,
        username,
      },
    });

    if (!checkIfTokenExists) {
      return res.status(400).json('token inválido');
    }
    return next();
  },
};
