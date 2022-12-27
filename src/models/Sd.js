const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Sd",
    {
      marca: {
        type: DataTypes.STRING,
      },
      modelo: {
        type: DataTypes.STRING,
      },
      almacenamiento: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
