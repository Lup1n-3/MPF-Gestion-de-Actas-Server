const router = require("express").Router();
//* Post
const addActa = require("../controllers/post/addActa");
const addEfecto = require("../controllers/post/addEfecto");
const addBolsa = require("../controllers/post/addBolsa");
const addPeritos = require("../controllers/post/addPeritos");
const addIntegrantes = require("../controllers/post/addIntegrantes");
const createBugReport = require("../controllers/post/createBugReport");
const addUser = require("../controllers/post/addUser");
const addIntervencion = require("../controllers/post/addIntervencion");
//* Get
const getActas = require("../controllers/get/getActas");
const getBugsReports = require("../controllers/get/getBugsReports");
const getUpdatedBolsas = require("../controllers/get/getUpdatedBolsas");
const getUsers = require("../controllers/get/getUsers");
const getIntervenciones = require("../controllers/get/getIntervenciones");
//* Put
const updateBolsa = require("../controllers/put/updateBolsa");
const updateActa = require("../controllers/put/updateActa");
const closeProcessActa = require("../controllers/put/closeProcessActa");
const editEfecto = require("../controllers/put/editEfecto");
const downIntervencion = require("../controllers/put/downIntervencion");
const addPropsToBolsa = require("../controllers/put/addPropsToBolsa");
const addPropsToActa = require("../controllers/put/addPropsToActa");
const completeTExtraccion = require("../controllers/put/completeTExtraccion");
//* Delete
const removeIntegrante = require("../controllers/delete/removeIntegrante");
const removePerito = require("../controllers/delete/removePerito");
const removeBolsa = require("../controllers/delete/removeBolsa");
const removeEfecto = require("../controllers/delete/removeEfecto");
const removeActa = require("../controllers/delete/removeActa");
const removeTipoExtraccion = require("../controllers/delete/removeTipoExtraccion");
const removeExtraccion = require("../controllers/delete/removeExtraccion");

//* Post
router.use("/addActa", addActa);
router.use("/addEfecto", addEfecto);
router.use("/addBolsa", addBolsa);
router.use("/addPeritos", addPeritos);
router.use("/addIntegrantes", addIntegrantes);
router.use("/createBugReport", createBugReport);
router.use("/addUser", addUser);
router.use("/addIntervencion", addIntervencion);

//* Get
router.use("/getActas", getActas);
router.use("/getBugsReports", getBugsReports);
router.use("/getUpdatedBolsas", getUpdatedBolsas);
router.use("/getUsers", getUsers);
router.use("/getIntervenciones", getIntervenciones);

//* Put
router.use("/updateBolsa", updateBolsa);
router.use("/updateActa", updateActa);
router.use("/closeProcessActa", closeProcessActa);
router.use("/editEfecto", editEfecto);
router.use("/downIntervencion", downIntervencion);
router.use("/addPropsToBolsa", addPropsToBolsa);
router.use("/addPropsToActa", addPropsToActa);
router.use("/completeTExtraccion", completeTExtraccion);

//* Delete
router.use("/removeIntegrante", removeIntegrante);
router.use("/removePerito", removePerito);
router.use("/removeBolsa", removeBolsa);
router.use("/removeEfecto", removeEfecto);
router.use("/removeActa", removeActa);
router.use("/removeTipoExtraccion", removeTipoExtraccion);
router.use("/removeExtraccion", removeExtraccion);

module.exports = router;
