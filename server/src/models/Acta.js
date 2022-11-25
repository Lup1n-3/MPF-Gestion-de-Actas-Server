const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Acta",
    {
      nro_mpf: {
        type: DataTypes.BIGINT,
      },
      nro_cij: {
        type: DataTypes.BIGINT,
      },
      nro_dil: {
        type: DataTypes.BIGINT,
      },
      nro_coop: {
        type: DataTypes.BIGINT,
      },
      nro_causa: {
        type: DataTypes.BIGINT,
      },
      caratula: {
        type: DataTypes.STRING,
      },
      solicitante: {
        type: DataTypes.STRING,
      },
      fecha: {
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleString(),
      },
      estado: {
        type: DataTypes.STRING,
        defaultValue: "en proceso",
      },
      observaciones: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
