const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.hasMany(models.Product, { foreignKey: 'user_id', as: 'products' });
  }
}

module.exports = User;
