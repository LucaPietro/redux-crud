const { Model, DataTypes } = require('sequelize');

class Product extends Model {
  static init(sequelize) {
    super.init(
      {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        amount: DataTypes.INTEGER,
        price: DataTypes.DECIMAL,
      },
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Product;
