const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Integrante",
    {
      nombreYApellido: {
        type: DataTypes.STRING,
      },
      cargo: {
        type: DataTypes.STRING,
      },
      dni: {
        type: DataTypes.BIGINT,
      },
      legajoOMatricula: {
        type: DataTypes.BIGINT,
      },
      acta_id: {
        type: DataTypes.BIGINT,
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
