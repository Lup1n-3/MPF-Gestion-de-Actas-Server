const addEfecto = require("express").Router();
const { Efecto } = require("../db");

addEfecto.post("/", async (req, res) => {
  try {
    const { bolsa_id } = req.query;

    //* Saco sims y discos de req.body.XXXX

    const newEfecto = await Efecto.create({
      bolsa_id: bolsa_id,
      ...req.body.efecto,
    });

    /*
      * Creo los sims con FK al efecto. Lo mismo con los discos
        sims.forEach((s) => {
        Sim.create({
        efecto_id: newEfecto.id,
        empresaSim: s.empresaSim,
        serialSim: s.serialSim,
        tipoExtraccionSim: s.tipoExtraccionSim,
        })
      })
    */

    return res.status(200).json(newEfecto);
  } catch (err) {
    console.log(err);
  }
});

module.exports = addEfecto;
