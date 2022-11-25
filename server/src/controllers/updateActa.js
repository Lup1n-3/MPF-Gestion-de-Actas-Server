const updateActa = require("express").Router();
const { Acta } = require("../db");

updateActa.put("/", async (req, res) => {
  const { observaciones, id } = req.body;

  try {
    const acta = await Acta.findByPk(id, { include: { all: true, nested: true } });
    acta.observaciones = observaciones;
    acta.save();

    return res.status(200).json(acta);
  } catch (err) {
    console.log(err);
  }
});

module.exports = updateActa;
