const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Bolsa",
    {
      nroPrecinto: {
        type: DataTypes.BIGINT,
      },
      colorPrecinto: {
        type: DataTypes.ENUM("rojo", "verde"),
      },
      observaciones: {
        type: DataTypes.STRING,
      },
      leyenda: {
        type: DataTypes.STRING,
      },
      nroPrecintoBlanco: {
        type: DataTypes.BIGINT,
        defaultValue: null,
      },
      estado: {
        type: DataTypes.ENUM("en proceso", "deprecado", "completo"),
        defaultValue: "en proceso",
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "last_update",
    }
  );
};
