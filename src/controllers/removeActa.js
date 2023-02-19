const removeActa = require("express").Router();
const { Acta } = require("../db");

removeActa.delete("/", async (req, res) => {
  const { acta_id } = req.query;

  try {
    const acta = await Acta.findByPk(acta_id);
    acta.destroy();
    await acta.save();

    const newActas = await Acta.findAll({ include: { all: true, nested: true } });

    return res.status(200).send(newActas);
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});

module.exports = removeActa;
