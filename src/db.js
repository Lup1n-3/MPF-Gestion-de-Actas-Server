const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const isDevelopment = process.env.NODE_ENV === "development";

const sequelize = new Sequelize(process.env.MYSQLDB_DATABASE, "root", process.env.MYSQLDB_ROOT_PASSWORD, {
  dialect: "mysql",
  host: isDevelopment ? "localhost" : process.env.MYSQLDB_HOST,
  port: isDevelopment ? 3306 : process.env.MYSQLDB_DOCKER_PORT,
  logging: false,
});

const basename = path.basename(__filename);

const modelDefiners = [];

//* Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter((file) => file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js")
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

//* Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

//* En sequelize.models están todos los modelos importados como propiedades
//* Para relacionarlos hacemos un destructuring
const { Acta, Efecto, Bolsa, Perito, Integrante, Sim, Disco, Sd, Extraccion, TipoExtraccion, Intervencion, Actor } =
  sequelize.models;

//* Relaciones
//! Gestion de Actas
Acta.hasMany(Bolsa, { foreignKey: "acta_id" });
Bolsa.belongsTo(Acta, { foreignKey: "acta_id" });
Acta.hasMany(Perito, { foreignKey: "acta_id" });
Perito.belongsTo(Acta, { foreignKey: "acta_id" });
Acta.hasMany(Integrante, { foreignKey: "acta_id" });
Integrante.belongsTo(Acta, { foreignKey: "acta_id" });
Bolsa.hasMany(Efecto, { foreignKey: "bolsa_id" });
Efecto.belongsTo(Bolsa, { foreignKey: "bolsa_id" });
Efecto.hasMany(Sim, { foreignKey: "efecto_id" });
Sim.belongsTo(Efecto, { foreignKey: "efecto_id" });
Efecto.hasMany(Disco, { foreignKey: "efecto_id" });
Disco.belongsTo(Efecto, { foreignKey: "efecto_id" });
Efecto.hasMany(Sd, { foreignKey: "efecto_id" });
Sd.belongsTo(Efecto, { foreignKey: "efecto_id" });
Efecto.hasMany(Extraccion, { foreignKey: "efecto_id" });
Extraccion.belongsTo(Efecto, { foreignKey: "efecto_id" });
Extraccion.hasMany(TipoExtraccion, { foreignKey: "extraccion_id" });
TipoExtraccion.belongsTo(Extraccion, { foreignKey: "extraccion_id" });
//!

//! Gestion de Intervenciones
Intervencion.hasMany(Actor, { foreignKey: "intervencion_id" });
Actor.belongsTo(Intervencion, { foreignKey: "intervencion_id" });
//!

module.exports = {
  ...sequelize.models, //* Para poder importar los modelos así: const { Product, User } = require('./db.js');
  db: sequelize, //* Para importart la conexión { conn } = require('./db.js');
};
