const removeIntegrante = require("express").Router();
const { Integrante } = require("../db");

removeIntegrante.delete("/", async (req, res) => {
  try {
    const { dni, acta_id } = req.query;

    const response = await Integrante.destroy({ where: { dni, acta_id } });
    if (!response) return res.status(404).send("Integrante no encontrado");
    res.status(200).send("Integrante eliminado con exito!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = removeIntegrante;
