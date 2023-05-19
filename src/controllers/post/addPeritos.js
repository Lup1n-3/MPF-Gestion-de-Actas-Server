const addPeritos = require("express").Router();
const { Perito } = require("../../db");

addPeritos.post("/", async (req, res) => {
  try {
    let acta_id;

    for (const i of req.body) {
      acta_id = i.acta_id;
      if (!i.id) {
        await Perito.create(i);
      }
    }

    const peritos = await Perito.findAll({ where: { acta_id: acta_id } });

    return res.status(200).json(peritos);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = addPeritos;
