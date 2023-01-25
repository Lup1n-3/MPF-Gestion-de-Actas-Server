const addEfecto = require("express").Router();
const { Efecto, Sim, Disco, Sd, Bolsa } = require("../db");

addEfecto.post("/", async (req, res) => {
  const { bolsa_id } = req.query;
  //* saco info del body
  const sims = req.body.sims;
  const discos = req.body.discos;
  const sds = req.body.sds;

  try {
    //* Actualizo los estados de la bolsa
    const bolsa = await Bolsa.findByPk(bolsa_id);
    if (bolsa) {
      if (req.body.efecto.estado === "completo") {
        bolsa.estado = "abierta con efectos completos";
      } else {
        bolsa.estado = "abierta con efectos en proceso";
      }
      bolsa.save();
    }

    const newEfecto = await Efecto.create({
      bolsa_id: bolsa_id,
      ...req.body.efecto,
    });
    if (newEfecto) {
      //* Creo los sims con FK al efecto
      await sims.forEach(async (s) => {
        await Sim.create({
          efecto_id: newEfecto.id,
          empresaSim: s.empresaSim,
          serialSim: s.serialSim,
          tipoExtraccionSim: s.tipoExtraccionSim,
        });
      });

      //* Creo los discos con FK al efecto
      await discos.forEach(async (d) => {
        await Disco.create({
          efecto_id: newEfecto.id,
          tipoDeDisco: d.tipoDeDisco,
          marca: d.marca,
          modelo: d.modelo,
          almacenamiento: d.almacenamiento,
          serialNumber: d.serialNumber,
        });
      });

      //* Creo las Sds con FK al efecto
      await sds.forEach(async (s) => {
        await Sd.create({
          efecto_id: newEfecto.id,
          marca: s.marca,
          modelo: s.modelo,
          almacenamiento: s.almacenamiento,
          tipoExtraccionSd: s.tipoExtraccionSd,
        });
      });
    }

    const finalEfecto = await Efecto.findByPk(newEfecto.id, { include: { all: true } });

    return res.status(200).json(finalEfecto);
  } catch (err) {
    console.log(err);
  }
});

module.exports = addEfecto;
