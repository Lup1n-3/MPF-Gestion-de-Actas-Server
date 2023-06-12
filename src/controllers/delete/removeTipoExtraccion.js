const removeTipoExtraccion = require("express").Router();
const { TipoExtraccion } = require("../../db");

removeTipoExtraccion.delete("/", async (req, res) => {
  try {
    await TipoExtraccion.destroy({ where: { id: req.query.id } });

    res.status(200).send("Tipo de extraccion eliminada con exito!");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = removeTipoExtraccion;
