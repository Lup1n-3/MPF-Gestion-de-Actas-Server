const removeExtraccion = require("express").Router();
const { Extraccion } = require("../../db");

removeExtraccion.delete("/", async (req, res) => {
  try {
    await Extraccion.destroy({ where: { id: req.query.id } });

    res.status(200).send("Extraccion eliminada con exito!");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = removeExtraccion;
