const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Sim",
    {
      empresaSim: {
        type: DataTypes.STRING,
      },
      serialSim: {
        type: DataTypes.STRING,
      },
      tipoExtraccionSim: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
