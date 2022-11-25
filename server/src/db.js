const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize("MPF_Word_App", "root", "12345", {
  //* Coneccion con DB
  host: "localhost",
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
const { Acta, Efecto, Bolsa, Integrante } = sequelize.models;

//* Relaciones
Acta.hasMany(Bolsa, { foreignKey: "acta_id" });
Bolsa.belongsTo(Acta, { foreignKey: "acta_id" });
Acta.hasMany(Integrante, { foreignKey: "acta_id" });
Integrante.belongsTo(Acta, { foreignKey: "acta_id" });
Bolsa.hasMany(Efecto, { foreignKey: "bolsa_id" });
Efecto.belongsTo(Bolsa, { foreignKey: "bolsa_id" });

module.exports = {
  ...sequelize.models, //* Para poder importar los modelos así: const { Product, User } = require('./db.js');
  db: sequelize, //* Para importart la conexión { conn } = require('./db.js');
};
