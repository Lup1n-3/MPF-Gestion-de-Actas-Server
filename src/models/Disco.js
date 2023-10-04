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
      serialNumber: {
        type: DataTypes.STRING,
      },
      herramientaSoftDisco: {
        type: DataTypes.STRING,
      },
      herramientaSoftDiscoVersion: {
        type: DataTypes.STRING,
      },
      adquisicion: {
        type: DataTypes.STRING,
      },
      discoFallado: {
        type: DataTypes.STRING,
      },
      observacionFallaDisco: {
        type: DataTypes.STRING,
      },
      estadoDisco: {
        type: DataTypes.STRING,
      },
      processToCompleteDiscco: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
