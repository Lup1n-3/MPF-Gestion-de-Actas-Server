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

      legajoOMatricula: {
        type: DataTypes.STRING,
      },
      locacion: {
        type: DataTypes.STRING,
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
