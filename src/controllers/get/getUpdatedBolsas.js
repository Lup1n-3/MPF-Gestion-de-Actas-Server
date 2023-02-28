const getUpdatedBolsas = require("express").Router();
const { Bolsa } = require("../../db");

getUpdatedBolsas.get("/", async (req, res) => {
  try {
    const bolsas = await Bolsa.findAll({ where: { acta_id: req.query.acta_id }, include: { all: true, nested: true } }); //* Me traigo todas las bolsas del acta con sus relaciones

    res.status(200).send(bolsas);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = getUpdatedBolsas;
