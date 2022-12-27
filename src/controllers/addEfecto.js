const addEfecto = require("express").Router();
const { Efecto, Sim, Disco, Sd } = require("../db");

addEfecto.post("/", async (req, res) => {
  const { bolsa_id } = req.query;
  //* saco info del body
  const sims = req.body.sims;
  const discos = req.body.discos;
  const sds = req.body.sds;

  try {
    const newEfecto = await Efecto.create({
      bolsa_id: bolsa_id,
      ...req.body.efecto,
    });

    //* Creo los sims con FK al efecto
    sims.forEach(async (s) => {
      await Sim.create({
        efecto_id: newEfecto.id,
        empresaSim: s.empresaSim,
        serialSim: s.serialSim,
        tipoExtraccionSim: s.tipoExtraccionSim,
      });
    });

    //* Creo los discos con FK al efecto
    discos.forEach(async (d) => {
      await Disco.create({
        efecto_id: newEfecto.id,
        tipoDeDisco: d.tipoDeDisco,
        marca: d.marca,
        modelo: d.modelo,
        almacenamiento: d.almacenamiento,
      });
    });

    sds.forEach(async (s) => {
      await Sd.create({
        efecto_id: newEfecto.id,
        marca: s.marca,
        modelo: s.modelo,
        almacenamiento: s.almacenamiento,
      });
    });

    return res.status(200).json(newEfecto);
  } catch (err) {
    console.log(err);
  }
});

module.exports = addEfecto;
