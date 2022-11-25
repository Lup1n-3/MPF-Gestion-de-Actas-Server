const addIntegrantes = require("express").Router();
const { Integrante } = require("../db");

addIntegrantes.post("/", async (req, res) => {
  try {
    const integrantes = req.body;

    const response = [];

    integrantes.forEach(async (integrante) => {
      const res = await Integrante.findOne({ where: { dni: integrante.dni } });
      if (!res) {
        const newIntegrante = await Integrante.create(integrante);
        response.push(newIntegrante);
      }
    });

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = addIntegrantes;
