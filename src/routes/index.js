const router = require("express").Router();
//* Importamos los Endpoints
//* Post
const addActa = require("../controllers/post/addActa");
const addEfecto = require("../controllers/post/addEfecto");
const addBolsa = require("../controllers/post/addBolsa");
const addPeritos = require("../controllers/post/addPeritos");
const addIntegrantes = require("../controllers/post/addIntegrantes");
const createBugReport = require("../controllers/post/createBugReport");
//* Get
const getActas = require("../controllers/get/getActas");
const getEfectos = require("../controllers/get/getEfectos");
const getBugsReports = require("../controllers/get/getBugsReports");
const getUpdatedBolsas = require("../controllers/get/getUpdatedBolsas");
//* Put
const updateBolsa = require("../controllers/put/updateBolsa");
const updateActa = require("../controllers/put/updateActa");
const closeProcessActa = require("../controllers/put/closeProcessActa");
//* Delete
const removeIntegrante = require("../controllers/delete/removeIntegrante");
const removePerito = require("../controllers/delete/removePerito");
const removeBolsa = require("../controllers/delete/removeBolsa");
const removeEfecto = require("../controllers/delete/removeEfecto");
const removeActa = require("../controllers/delete/removeActa");

//* Generamos las rutas
//* Post
router.use("/addActa", addActa);
router.use("/addEfecto", addEfecto);
router.use("/addBolsa", addBolsa);
router.use("/addPeritos", addPeritos);
router.use("/addIntegrantes", addIntegrantes);
router.use("/createBugReport", createBugReport);
//* Get
router.use("/getActas", getActas);
router.use("/getEfectos", getEfectos);
router.use("/getBugsReports", getBugsReports);
router.use("/getUpdatedBolsas", getUpdatedBolsas);
//* Put
router.use("/updateBolsa", updateBolsa);
router.use("/updateActa", updateActa);
router.use("/closeProcessActa", closeProcessActa);
//* Delete
router.use("/removeIntegrante", removeIntegrante);
router.use("/removePerito", removePerito);
router.use("/removeBolsa", removeBolsa);
router.use("/removeEfecto", removeEfecto);
router.use("/removeActa", removeActa);

module.exports = router;
