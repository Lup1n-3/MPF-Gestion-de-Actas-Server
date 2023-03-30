const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Efecto",
    {
      tipoDeElemento: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      marca: {
        type: DataTypes.STRING,
      },
      modelo: {
        type: DataTypes.STRING,
      },
      imei: {
        type: DataTypes.STRING,
      },
      serialNumber: {
        type: DataTypes.STRING,
      },
      tipoSeguridad: {
        type: DataTypes.STRING,
        defaultValue: "ninguna",
      },
      desbloqueo: {
        type: DataTypes.STRING,
        defaultValue: null,
      },
      herramientaSoft: {
        type: DataTypes.STRING,
        defaultValue: "ninguna",
      },
      tipoExtraccion: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.STRING,
        defaultValue: "en proceso",
      },
      extraccion: {
        type: DataTypes.STRING,
      },
      almacenamiento: {
        type: DataTypes.STRING,
      },
      encendido: {
        type: DataTypes.STRING,
      },
      observacionEncendido: {
        type: DataTypes.STRING,
      },
      elementoFallado: {
        type: DataTypes.STRING,
      },
      observacionFalla: {
        type: DataTypes.STRING,
      },
      tipoDeDisco: {
        type: DataTypes.STRING,
      },
      color: {
        type: DataTypes.STRING,
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
