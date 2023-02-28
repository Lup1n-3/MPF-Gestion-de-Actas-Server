const addBolsa = require("express").Router();
const { Bolsa } = require("../../db");

addBolsa.post("/", async (req, res) => {
  try {
    const newBolsa = await Bolsa.create({ ...req.body }); //* Creo la bolsa

    const updatedBolsa = await Bolsa.findByPk(newBolsa.id, { include: { all: true, nested: true } });

    return res.status(200).send(updatedBolsa); //* Mando la bolsa actualizada
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = addBolsa;
