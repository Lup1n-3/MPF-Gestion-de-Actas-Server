const removeBolsa = require("express").Router();
const { Bolsa } = require("../db");

removeBolsa.delete("/", async (req, res) => {
  try {
    const { bolsa_id } = req.query;

    const response = await Bolsa.destroy({ where: { id: bolsa_id } });
    if (!response) return res.status(404).send("Bolsa no encontrada");
    res.status(200).send("Bolsa eliminada con exito!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = removeBolsa;
