const router = require("express").Router();
//* Importamos los Endpoints
const addActa = require("../controllers/addActa");
const getActas = require("../controllers/getActas");
const addEfecto = require("../controllers/addEfecto");
const getEfectos = require("../controllers/getEfectos");
const addBolsa = require("../controllers/addBolsa");
const addPeritos = require("../controllers/addPeritos");
const addIntegrantes = require("../controllers/addIntegrantes");
const updateBolsa = require("../controllers/updateBolsa");
const updateActa = require("../controllers/updateActa");
const removePerito = require("../controllers/removePerito");
const removeIntegrante = require("../controllers/removeIntegrante");
const createBugReport = require("../controllers/createBugReport");
const getBugsReports = require("../controllers/getBugsReports");
const getUpdatedBolsas = require("../controllers/getUpdatedBolsas");
const removeBolsa = require("../controllers/removeBolsa");
const closeProcessActa = require("../controllers/closeProcessActa");
const removeEfecto = require("../controllers/removeEfecto");
const removeActa = require("../controllers/removeActa");

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
