const router = require("express").Router();
//* Importamos los Endpoints
const addActa = require("../controllers/post/addActa");
const getActas = require("../controllers/get/getActas");
const addEfecto = require("../controllers/post/addEfecto");
const getEfectos = require("../controllers/get/getEfectos");
const addBolsa = require("../controllers/post/addBolsa");
const addPeritos = require("../controllers/post/addPeritos");
const addIntegrantes = require("../controllers/post/addIntegrantes");
const updateBolsa = require("../controllers/put/updateBolsa");
const updateActa = require("../controllers/put/updateActa");
const removePerito = require("../controllers/delete/removePerito");
const removeIntegrante = require("../controllers/delete/removeIntegrante");
const createBugReport = require("../controllers/post/createBugReport");
const getBugsReports = require("../controllers/get/getBugsReports");
const getUpdatedBolsas = require("../controllers/get/getUpdatedBolsas");
const removeBolsa = require("../controllers/delete/removeBolsa");
const closeProcessActa = require("../controllers/put/closeProcessActa");
const removeEfecto = require("../controllers/delete/removeEfecto");
const removeActa = require("../controllers/delete/removeActa");

//* Generamos las rutas
router.use("/addActa", addActa);
router.use("/addBolsa", addBolsa);
router.use("/addPeritos", addPeritos);
router.use("/addIntegrantes", addIntegrantes);
router.use("/addEfecto", addEfecto);
router.use("/getActas", getActas);
router.use("/getEfectos", getEfectos);
router.use("/updateBolsa", updateBolsa);
router.use("/updateActa", updateActa);
router.use("/removePerito", removePerito);
router.use("/removeIntegrante", removeIntegrante);
router.use("/createBugReport", createBugReport);
router.use("/getBugsReports", getBugsReports);
router.use("/getUpdatedBolsas", getUpdatedBolsas);
router.use("/removeBolsa", removeBolsa);
router.use("/closeProcessActa", closeProcessActa);
router.use("/removeEfecto", removeEfecto);
router.use("/removeActa", removeActa);

module.exports = router;
