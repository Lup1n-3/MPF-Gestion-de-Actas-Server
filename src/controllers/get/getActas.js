const getActas = require("express").Router();
const { Acta } = require("../../db");

getActas.get("/", async (req, res) => {
  try {
    const allActas = await Acta.findAll({ include: { all: true, nested: true } }); //* Me traigo todas las actas con todas sus relaciones

    return res.status(200).send(allActas);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

getActas.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const acta = await Acta.findByPk(id, { include: { all: true, nested: true } }); //* Me traigo el acta con todas sus relaciones

    return res.status(200).send(acta);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = getActas;
