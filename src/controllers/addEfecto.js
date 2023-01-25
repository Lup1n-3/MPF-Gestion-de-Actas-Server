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

    //* Inyecto el id del efecto a los sims
    sims.forEach((s) => (s.efecto_id = newEfecto.id));
    //* Creo los sims con FK al efecto
    await Sim.bulkCreate(sims);

    //* Inyecto el id del efecto a los discos
    discos.forEach((d) => (d.efecto_id = newEfecto.id));
    //* Creo los discos con FK al efecto
    await Disco.bulkCreate(discos);

    //* Inyecto el id del efecto a las sds
    sds.forEach((s) => (s.efecto_id = newEfecto.id));
    //* Creo las Sds con FK al efecto
    await Sd.bulkCreate(sds);

    const finalEfecto = await Efecto.findByPk(newEfecto.id, { include: { all: true } });
    console.log(finalEfecto);

    return res.status(200).json(finalEfecto);
  } catch (err) {
    console.log(err);
  }
});

module.exports = addEfecto;
