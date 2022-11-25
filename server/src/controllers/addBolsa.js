const addBolsa = require("express").Router();
const { Bolsa } = require("../db");

addBolsa.post("/", async (req, res) => {
  try {
    const { acta_id, colorPrecinto, nroPrecinto, observaciones } = req.body;

    const newBolsa = await Bolsa.create({
      acta_id,
      colorPrecinto,
      nroPrecinto: Number(nroPrecinto),
      observaciones,
    });

    return res.status(200).json(newBolsa);
  } catch (err) {
    console.log(err);
  }
});

module.exports = addBolsa;
