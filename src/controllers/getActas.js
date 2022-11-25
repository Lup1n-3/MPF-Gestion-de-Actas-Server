const getActas = require("express").Router();
const { Acta } = require("../db");

getActas.get("/", async (req, res) => {
  try {
    const { enProceso } = req.query;

    const actas = await Acta.findAll({ include: { all: true, nested: true } }); //* Guardo todas las actas con todas sus tablas

    if (enProceso) {
      //* Devuelve todas las actas en proceso, con o sin filtros
      const actasEnProceso = actas.filter((acta) => acta.estado === "en proceso"); //* Guardo las actas en proceso

      if (actasEnProceso) {
        return res.status(200).json(actasEnProceso);
      }
    } else {
      //* Si no me pasaron enProceso === true devuelvo todas las actas
      console.log(actas);
      return res.status(200).json(actas);
    }
  } catch (err) {
    console.log(err);
  }
});

getActas.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const acta = await Acta.findOne({
      where: { id },
      include: { all: true, nested: true },
    });

    if (acta) {
      return res.status(200).json(acta);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = getActas;
