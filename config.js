const config = {
  PORT: process.env.PORT || 3030,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "12345",
  DB_NAME: process.env.DB_NAME || "MPF_Gestion_De_Actas",
  DB_PORT: process.env.DB_PORT || 3306,
};

module.exports = config;
