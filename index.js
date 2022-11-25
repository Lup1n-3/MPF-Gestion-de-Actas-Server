const server = require("./src/app.js");
const { db } = require("./src/db.js");

//* Pisa la DB cada vez que se salva el Backend
db.sync().then(() => {
  server.listen(process.env.PORT || 3030, () => {
    console.log("--->   Servidor en puerto 3030"); // eslint-disable-line no-console
  });
});
