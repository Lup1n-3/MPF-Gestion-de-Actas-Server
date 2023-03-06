const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "User",
    {
      nombreYApellido: {
        type: DataTypes.STRING,
      },
      legajo: {
        type: DataTypes.INTEGER,
      },
      cargo: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
