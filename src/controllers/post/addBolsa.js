const addBolsa = require("express").Router();
const { Bolsa } = require("../../db");

addBolsa.post("/", async (req, res) => {
  try {
    const { acta_id, colorPrecinto, nroPrecinto, observaciones } = req.body;

    const newBolsa = await Bolsa.create({
      acta_id,
      colorPrecinto,
      nroPrecinto: nroPrecinto,
      observaciones,
    });

    const updatedBolsa = await Bolsa.findByPk(newBolsa.id, { include: { all: true, nested: true } });

    return res.status(200).json(updatedBolsa);
  } catch (err) {
    console.log(err);
  }
});

module.exports = addBolsa;
