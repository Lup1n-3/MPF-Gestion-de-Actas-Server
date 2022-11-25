const updateBolsa = require("express").Router();
const { Bolsa } = require("../db");

updateBolsa.put("/", async (req, res) => {
  const { nroPrecintoBlanco, nroPrecinto, leyenda } = req.body;

  if (!leyenda) {
    try {
      const bolsa = await Bolsa.findOne({ where: { nroPrecinto: nroPrecinto } });

      bolsa.nroPrecintoBlanco = nroPrecintoBlanco;
      bolsa.estado = "completo";
      bolsa.save();

      res.status(200).json(bolsa);
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const bolsa = await Bolsa.findOne({ where: { nroPrecinto: nroPrecinto } });

      bolsa.leyenda = leyenda;
      bolsa.save();

      res.status(200).json(bolsa);
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = updateBolsa;
