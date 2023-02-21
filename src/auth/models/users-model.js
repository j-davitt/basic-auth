'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelizeDB, DataTypes) => {
  const model = sequelizeDB.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  model.beforeCreate(async (user) => {
    let hashedPassword = await bcrypt.hash(user.password, 10);
    console.log('this is hashed password', hashedPassword);
    user.password = hashedPassword;
  });

  return model;
};

