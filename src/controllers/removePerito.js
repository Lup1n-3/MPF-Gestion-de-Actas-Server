const removePerito = require("express").Router();
const { Perito } = require("../db");

removePerito.delete("/:dni", async (req, res) => {
  try {
    const { dni } = req.params;

    const response = await Perito.destroy({ where: { dni } });
    if (!response) return res.status(404).send("Perito no encontrado");
    res.status(200).send("Perito eliminado con exito!");
  } catch (err) {
    console.log(err);
  }
});

module.exports = removePerito;
