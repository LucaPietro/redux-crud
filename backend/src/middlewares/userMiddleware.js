const User = require('../models/User');

module.exports = {
  async createUser(req, res, next) {
    const { username, email, password } = req.body;

    const checkIfUserExists = await User.findAll({
      where: {
        username,
      },
    });

    if (checkIfUserExists.length > 0) {
      return res.status(400).json('Nome de usuário já em uso.');
    }

    const checkIfEmailExists = await User.findAll({
      where: {
        email,
      },
    });

    if (checkIfEmailExists.length > 0) {
      return res.status(400).json('Este email já está cadastrado.');
    }

    if (password.length < 8 || password.length > 16) {
      return res.status(400).json('Sua senha deve conter entre 8 e 16 caracteres.');
    }

    return next();
  },
};
