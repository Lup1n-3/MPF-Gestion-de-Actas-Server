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
    },
    {
      timestamps: false,
    }
  );
};
