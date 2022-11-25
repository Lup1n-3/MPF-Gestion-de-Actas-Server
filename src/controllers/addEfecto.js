const addEfecto = require("express").Router();
const { Efecto } = require("../db");

addEfecto.post("/", async (req, res) => {
  try {
    const { bolsa_id } = req.query;
    const {
      tipoDeElemento,
      marca,
      modelo,
      imei,
      imei2,
      estado,
      sistemaOperativo,
      tipoSeguridad,
      desbloqueo,
      herramientaSoft,
      tipoExtraccion,
      descripcionTarea,
    } = req.body;

    const newEfecto = await Efecto.create({
      bolsa_id: bolsa_id,
      tipoDeElemento,
      marca,
      modelo,
      imei,
      imei2,
      sistemaOperativo,
      tipoSeguridad,
      desbloqueo,
      herramientaSoft,
      tipoExtraccion,
      descripcionTarea,
      estado,
    });

    return res.status(200).json(newEfecto);
  } catch (err) {
    console.log(err);
  }
});

module.exports = addEfecto;
