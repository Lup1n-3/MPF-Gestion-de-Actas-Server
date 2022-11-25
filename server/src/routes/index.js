const router = require("express").Router();
//* Importamos los Endpoints
const addActa = require("../controllers/addActa");
const getActas = require("../controllers/getActas");
const addEfecto = require("../controllers/addEfecto");
const getEfectos = require("../controllers/getEfectos");
const addBolsa = require("../controllers/addBolsa");
const addIntegrantes = require("../controllers/addIntegrantes");
const updateBolsa = require("../controllers/updateBolsa");
const updateActa = require("../controllers/updateActa");
const removeIntegrante = require("../controllers/removeIntegrante");

//* Generamos las rutas
router.use("/addActa", addActa);
router.use("/addBolsa", addBolsa);
router.use("/addIntegrantes", addIntegrantes);
router.use("/addEfecto", addEfecto);
router.use("/getActas", getActas);
router.use("/getEfectos", getEfectos);
router.use("/updateBolsa", updateBolsa);
router.use("/updateActa", updateActa);
router.use("/removeIntegrante", removeIntegrante);

module.exports = router;
