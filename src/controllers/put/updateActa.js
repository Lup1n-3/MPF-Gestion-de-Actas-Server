const updateActa = require("express").Router();
const { Acta } = require("../../db");

updateActa.put("/", async (req, res) => {
  try {
    const acta = await Acta.findByPk(req.body.id, { include: { all: true, nested: true } });
    acta.observaciones = req.body.observaciones;
    acta.save();

    return res.status(200).send(acta);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = updateActa;
