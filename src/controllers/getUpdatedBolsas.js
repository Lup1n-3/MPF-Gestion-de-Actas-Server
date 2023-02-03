const getUpdatedBolsas = require("express").Router();
const { Bolsa } = require("../db");

getUpdatedBolsas.get("/", async (req, res) => {
  const { acta_id } = req.query;

  try {
    const bolsas = await Bolsa.findAll({ where: { acta_id: acta_id }, include: { all: true } });

    res.status(200).json(bolsas);
  } catch (err) {
    console.log(err);
  }
});

module.exports = getUpdatedBolsas;
