const addActa = require("express").Router();
const { Acta } = require("../db");

addActa.post("/", async (req, res) => {
  try {
    const {
      mpfOrDen: nro_mpf,
      cij: nro_cij,
      dil: nro_dil,
      coop: nro_coop,
      nroCausa: nro_causa,
      caratula,
      solicitante,
    } = req.body;

    const newActa = await Acta.create({
      //* Crea el acta
      nro_mpf: Number(nro_mpf),
      nro_dil: Number(nro_dil),
      nro_cij: Number(nro_cij),
      nro_coop: Number(nro_coop),
      nro_causa: Number(nro_causa),
      solicitante,
      caratula,
    });

    return res.status(200).json(newActa);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.sqlMessage);
  }
});

module.exports = addActa;
