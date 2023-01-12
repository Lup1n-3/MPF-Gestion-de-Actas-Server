const addIntegrantes = require("express").Router();
const { Integrante } = require("../db");

addIntegrantes.post("/", async (req, res) => {
  try {
    const integrantes = req.body;

    const newIntegrante = await Integrante.bulkCreate(integrantes);

    return res.status(200).json(newIntegrante);
  } catch (err) {
    console.log(err);
  }
});

module.exports = addIntegrantes;
