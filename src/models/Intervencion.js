const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Intervencion",
    {
      nroDil: {
        type: DataTypes.STRING,
      },
      nroCij: {
        type: DataTypes.STRING,
      },
      legajo: {
        type: DataTypes.STRING,
      },
      lugar: {
        type: DataTypes.STRING,
      },
      articulos: {
        type: DataTypes.STRING,
      },
      fecha: {
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      },
      fechaInicio: {
        type: DataTypes.STRING,
      },
      fechaFin: {
        type: DataTypes.STRING,
      },
      solicitante: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
