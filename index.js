const server = require("./src/app.js");
const { db } = require("./src/db.js");
const { PORT } = require("./config.js");

//* Pisa la DB cada vez que se salva el Backend
db.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log("--->   Servidor en puerto", PORT); // eslint-disable-line no-console
  });
});
