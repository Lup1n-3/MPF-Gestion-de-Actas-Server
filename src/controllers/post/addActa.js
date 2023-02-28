const addActa = require("express").Router();
const { Acta } = require("../../db");

addActa.post("/", async (req, res) => {
  const {
    mpfOrDen: nro_mpf,
    cij: nro_cij,
    dil: nro_dil,
    coop: nro_coop,
    nroCausa: nro_causa,
    caratula,
    solicitante,
    dias,
    mes,
    anio,
    hora,
  } = req.body;

  try {
    const newActa = await Acta.create({
      //* Crea el acta
      nro_mpf,
      nro_dil,
      nro_cij,
      nro_coop,
      nro_causa,
      solicitante,
      caratula,
      dias,
      mes,
      anio,
      hora,
    });

    return res.status(200).send(newActa);
  } catch (err) {
    console.log(err);
    return res.statusCode(500).send(err);
  }
});

module.exports = addActa;
