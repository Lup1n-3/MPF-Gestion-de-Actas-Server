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
        type: DataTypes.ENUM("en proceso", "completo", "deprecado"),
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
