const removeIntegrante = require("express").Router();
const { Integrante } = require("../../db");

removeIntegrante.delete("/", async (req, res) => {
  const { legajoOMatricula, id } = req.query;

  try {
    const response = await Integrante.destroy({ where: { legajoOMatricula: legajoOMatricula, id: id } });
    if (!response) return res.status(404).send("Integrante no encontrado");

    res.status(200).send("Integrante eliminado con exito!");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = removeIntegrante;
