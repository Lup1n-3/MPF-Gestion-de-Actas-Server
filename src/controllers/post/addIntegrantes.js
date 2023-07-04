const addIntegrantes = require("express").Router();
const { Integrante } = require("../../db");

addIntegrantes.post("/", async (req, res) => {
  try {
    let acta_id;

    for (const i of req.body) {
      acta_id = i.acta_id;
      if (!i.id) {
        await Integrante.create(i);
      }
    }

    const integrantes = await Integrante.findAll({ where: { acta_id: acta_id } });

    return res.status(200).json(integrantes);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = addIntegrantes;
