const addPeritos = require("express").Router();
const { Perito } = require("../../db");

addPeritos.post("/", async (req, res) => {
  try {
    const newPerito = await Perito.bulkCreate(req.body.peritos);

    return res.status(200).json(newPerito);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = addPeritos;
