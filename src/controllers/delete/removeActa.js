const removeActa = require("express").Router();
const { Acta } = require("../../db");

removeActa.delete("/", async (req, res) => {
  try {
    const response = await Acta.destroy({ where: { id: req.query.acta_id } }); //* Elimino el acta
    if (!response) return res.status(404).send("Bolsa no encontrada");

    const newActas = await Acta.findAll({ include: { all: true, nested: true }, order: [["id", "DESC"]] }); //* Me traigo las demas actas y las mando al FE

    return res.status(200).send(newActas);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = removeActa;
