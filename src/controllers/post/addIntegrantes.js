const addIntegrantes = require("express").Router();
const { Integrante } = require("../../db");

addIntegrantes.post("/", async (req, res) => {
  try {
    const newIntegrante = await Integrante.bulkCreate(req.body.integrantes);

    return res.status(200).json(newIntegrante);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = addIntegrantes;
