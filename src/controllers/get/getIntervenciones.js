const getIntervenciones = require("express").Router();
const { Intervencion } = require("../../db");

getIntervenciones.get("/", async (req, res) => {
  try {
    const intervenciones = await Intervencion.findAll({ include: { all: true, nested: true } });

    return res.status(200).json(intervenciones);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err });
  }
});

getIntervenciones.get("/:id", async (req, res) => {
  try {
    console.log(req.query);
    const intervencion = await Intervencion.findOne({
      where: { id: req.params.id },
      include: { all: true, nested: true },
    });

    if (intervencion) {
      return res.status(200).json(intervencion);
    }

    return res.status(400).send("Intervencion no encontrada");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err });
  }
});

module.exports = getIntervenciones;
