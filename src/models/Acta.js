const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Acta",
    {
      nro_mpf: {
        type: DataTypes.STRING,
      },
      nro_cij: {
        type: DataTypes.STRING,
      },
      nro_dil: {
        type: DataTypes.STRING,
      },
      nro_coop: {
        type: DataTypes.STRING,
      },
      nro_causa: {
        type: DataTypes.STRING,
      },
      caratula: {
        type: DataTypes.STRING,
      },
      solicitante: {
        type: DataTypes.STRING,
      },
      dias: {
        type: DataTypes.INTEGER,
      },
      mes: {
        type: DataTypes.STRING,
      },
      anio: {
        type: DataTypes.STRING,
      },
      hora: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.STRING,
        defaultValue: "en creacion",
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
