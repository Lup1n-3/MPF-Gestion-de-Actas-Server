const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Disco",
    {
      tipoDeDisco: {
        type: DataTypes.STRING,
      },
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