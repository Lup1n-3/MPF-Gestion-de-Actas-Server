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
      descripcionElemento: {
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
      estado: {
        type: DataTypes.STRING,
        defaultValue: "en proceso",
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
      processToCompleteEfecto: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      unidadAlmacenamientoDetalle: {
        type: DataTypes.STRING,
      },
      adquisicion: {
        type: DataTypes.STRING,
      },
      herramientaSoft: {
        type: DataTypes.STRING,
      },
      herramientaSoftVersion: {
        type: DataTypes.STRING,
      },
      empresa: {
        type: DataTypes.STRING,
      },
      tipoExtraccion: {
        type: DataTypes.STRING,
      },
      cantidadTotal: {
        type: DataTypes.STRING,
      },
      cantidadInteres: {
        type: DataTypes.STRING,
      },
      interes: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
