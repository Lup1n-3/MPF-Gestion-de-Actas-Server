const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "BugReport",
    {
      pathname: {
        type: DataTypes.STRING,
      },
      description: {
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
