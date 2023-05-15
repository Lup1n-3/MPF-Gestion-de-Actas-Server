const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "TipoExtraccion",
    {
      nombre: {
        type: DataTypes.STRING,
      },
      estado: {
        type: DataTypes.STRING,
      },
      observacionFalla: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
