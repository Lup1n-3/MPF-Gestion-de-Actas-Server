const server = require("./src/app.js");
const { db } = require("./src/db.js");

//* {force: true} Pisa la DB cada vez que se salva el Backend
//* {alter: true} alterna las tablas cada vez que se salva el Backend

db.sync({ force: true }).then(() => {
  server.listen(process.env.NODE_LOCAL_PORT, () => {
    console.log("--->   Servidor en puerto", process.env.NODE_LOCAL_PORT); // eslint-disable-line no-console
  });   
});
