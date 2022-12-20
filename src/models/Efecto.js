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
      imei2: {
        type: DataTypes.STRING,
      },
      sistemaOperativo: {
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
      descripcionTarea: {
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
