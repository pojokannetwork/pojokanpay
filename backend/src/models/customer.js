const { DataTypes } = require('sequelize');
const sequelize = require('./index');
const Customer = sequelize.define('Customer', {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  name: { type: DataTypes.STRING, allowNull: false },
  address: DataTypes.TEXT,
  phone: DataTypes.STRING,
  package_id: DataTypes.INTEGER,
  status: { type: DataTypes.ENUM('active','inactive'), defaultValue: 'active' }
}, { tableName: 'customers', timestamps: true });
module.exports = Customer;
