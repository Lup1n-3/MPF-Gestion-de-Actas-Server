const addPeritos = require("express").Router();
const { Perito } = require("../db");

addPeritos.post("/", async (req, res) => {
  try {
    const peritos = req.body;

    const response = [];

    peritos.forEach(async (perito) => {
      const res = await Perito.findOne({ where: { dni: perito.dni } });
      if (!res) {
        const newPerito = await Perito.create(perito);
        response.push(newPerito);
      }
    });

    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
  }
});

module.exports = addPeritos;
