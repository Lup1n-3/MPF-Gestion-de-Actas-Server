const removePerito = require("express").Router();
const { Perito } = require("../../db");

removePerito.delete("/", async (req, res) => {
  const { dni, acta_id } = req.query;

  try {
    const response = await Perito.destroy({ where: { dni, acta_id } });
    if (!response) return res.status(404).send("Perito no encontrado");
    res.status(200).send("Perito eliminado con exito!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = removePerito;
