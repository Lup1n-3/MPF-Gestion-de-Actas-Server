const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Bolsa",
    {
      nroPrecinto: {
        type: DataTypes.STRING,
      },
      colorPrecinto: {
        type: DataTypes.ENUM("rojo", "verde", "blanco"),
        defaultValue: null,
      },
      observaciones: {
        type: DataTypes.STRING,
      },
      leyenda: {
        type: DataTypes.TEXT,
      },
      nroPrecintoBlanco: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      estado: {
        type: DataTypes.STRING,
        defaultValue: "abierta sin efectos",
      },
      fecha: {
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
      processToCompleteBolsa: {
        type: DataTypes.STRING,
        defaultValue: "true",
      },
    },
    {
      timestamps: false,
    }
  );
};
