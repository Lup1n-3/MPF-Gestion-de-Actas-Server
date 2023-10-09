const addPropsToBolsa = require("express").Router();
const { Bolsa } = require("../../db");

addPropsToBolsa.put("/", async (req, res) => {
  const bolsaId = req.body.id;

  try {
    const bolsa = await Bolsa.findOne({ where: { id: bolsaId } });
    bolsa.complete = "true";
    bolsa.save();

    return res.status(200).send("Bolsa actualizada");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

addPropsToBolsa.put("/2", async (req, res) => {
  const bolsaId = req.body.id;

  try {
    const bolsa = await Bolsa.findOne({ where: { id: bolsaId } });
    bolsa.processToCompleteBolsa = "true";
    bolsa.save();

    return res.status(200).send("Bolsa actualizada");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = addPropsToBolsa;
