const completeTExtraccion = require("express").Router();
const { TipoExtraccion } = require("../../db");

completeTExtraccion.put("/", async (req, res) => {
  try {
    const tEx = await TipoExtraccion.findOne({ where: { id: req.query.id } });
    tEx.estado = "completo";
    tEx.save();

    return res.status(200).send("Tipo de Extraccion actualizada");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = completeTExtraccion;
