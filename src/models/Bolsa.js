const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Bolsa",
    {
      nroPrecinto: {
        type: DataTypes.BIGINT,
      },
      colorPrecinto: {
        type: DataTypes.ENUM("rojo", "verde", "blanco"),
        defaultValue: null,
      },
      observaciones: {
        type: DataTypes.STRING,
      },
      leyenda: {
        type: DataTypes.STRING,
      },
      nroPrecintoBlanco: {
        type: DataTypes.BIGINT,
        defaultValue: null,
      },
      estado: {
        type: DataTypes.ENUM("en proceso", "completo", "deprecado"),
        defaultValue: "en proceso",
      },
      fecha: {
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleString(),
      },
    },
    {
      timestamps: false,
    }
  );
};
