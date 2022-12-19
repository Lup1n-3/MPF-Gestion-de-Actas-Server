const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = require("../config.js");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  //* Conexion con DB
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
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
const { Acta, Efecto, Bolsa, Integrante, Sim, Disco } = sequelize.models;

//* Relaciones
Acta.hasMany(Bolsa, { foreignKey: "acta_id" });
Bolsa.belongsTo(Acta, { foreignKey: "acta_id" });
Acta.hasMany(Integrante, { foreignKey: "acta_id" });
Integrante.belongsTo(Acta, { foreignKey: "acta_id" });
Bolsa.hasMany(Efecto, { foreignKey: "bolsa_id" });
Efecto.belongsTo(Bolsa, { foreignKey: "bolsa_id" });
Efecto.hasMany(Sim, { foreignKey: "efecto_id" });
Sim.belongsTo(Efecto, { foreignKey: "efecto_id" });
Efecto.hasMany(Disco, { foreignKey: "efecto_id" });
Disco.belongsTo(Efecto, { foreignKey: "efecto_id" });

module.exports = {
  ...sequelize.models, //* Para poder importar los modelos así: const { Product, User } = require('./db.js');
  db: sequelize, //* Para importart la conexión { conn } = require('./db.js');
};
