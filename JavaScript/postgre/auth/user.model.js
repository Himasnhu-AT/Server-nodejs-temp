const { DataTypes, Model, Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'your_database_name',
  username: 'your_username',
  password: 'your_password',
  host: 'localhost',
  port: 5432,
});

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

module.exports = User;
