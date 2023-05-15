const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Extraccion",
    {
      herramientaSoft: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
