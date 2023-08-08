const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Actor",
    {
      nombreYApellido: {
        type: DataTypes.STRING,
      },
      articulo: {
        type: DataTypes.STRING,
      },
      etapa: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
