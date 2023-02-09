const addPeritos = require("express").Router();
const { Perito } = require("../db");

addPeritos.post("/", async (req, res) => {
  try {
    const peritos = req.body;

    const newPerito = await Perito.bulkCreate(peritos);

    return res.status(200).json(newPerito);
  } catch (err) {
    console.log(err);
  }
});

module.exports = addPeritos;
