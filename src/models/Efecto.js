const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Efecto",
    {
      tipoDeElemento: {
        type: DataTypes.ENUM("celular", "tablet", "notebook", "pc", "hdd", "ssd", "sim", "sd"),
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
        type: DataTypes.ENUM("patrón", "contraseña", "ninguna", "pin", "facial", "huella"),
        defaultValue: "ninguna",
      },
      desbloqueo: {
        type: DataTypes.ENUM("", "si", "no"),
        defaultValue: null,
      },
      herramientaSoft: {
        type: DataTypes.ENUM("ninguna", "UFED"),
        defaultValue: "ninguna",
      },
      tipoExtraccion: {
        type: DataTypes.STRING,
      },
      descripcionTarea: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.ENUM("en proceso", "completo"),
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
