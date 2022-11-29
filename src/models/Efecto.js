const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Efecto",
    {
      tipoDeElemento: {
        type: DataTypes.ENUM("celular", "tablet", "notebook", "pc", "hdd", "ssd", "sim", "sd"),
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
        type: DataTypes.ENUM("patrón", "contraseña", "ninguno", "pin", "facial", "huella"),
      },
      desbloqueo: {
        type: DataTypes.ENUM("si", "no"),
      },
      herramientaSoft: {
        type: DataTypes.ENUM("ninguna", "UFED"),
      },
      tipoExtraccion: {
        type: DataTypes.ENUM("ninguna", "logica", "fisica", "ambas"),
      },
      descripcionTarea: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.ENUM("en proceso", "completo"),
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
