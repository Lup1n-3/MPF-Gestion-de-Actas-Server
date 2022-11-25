const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Efecto",
    {
      tipoDeElemento: {
        type: DataTypes.STRING,
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
      },
      desbloqueo: {
        type: DataTypes.STRING,
      },
      herramientaSoft: {
        type: DataTypes.STRING,
      },
      tipoExtraccion: {
        type: DataTypes.STRING,
      },
      descripcionTarea: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.STRING,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "last_update",
    }
  );
};
