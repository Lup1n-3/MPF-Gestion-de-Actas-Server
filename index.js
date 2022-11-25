const server = require("./src/app.js");
const { db } = require("./src/db.js");
const { DB_PORT } = require("./config.js");

//* Pisa la DB cada vez que se salva el Backend
db.sync().then(() => {
  server.listen(DB_PORT, () => {
    console.log("--->   Servidor en puerto", DB_PORT); // eslint-disable-line no-console
  });
});
