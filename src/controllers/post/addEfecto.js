const addEfecto = require("express").Router();
const { Efecto, Sim, Disco, Sd, Bolsa } = require("../../db");

addEfecto.post("/", async (req, res) => {
  //* saco la info
  const { bolsa_id } = req.query;
  const sims = req.body.sims;
  const discos = req.body.discos;
  const sds = req.body.sds;

  try {
    //* Actualizo los estados de la bolsa
    const bolsa = await Bolsa.findByPk(bolsa_id);

    if (req.body.efecto.estado === "completo") {
      if (bolsa.estado !== "abierta con efectos en proceso") {
        bolsa.estado = "abierta con efectos completos";
      }
    } else {
      bolsa.estado = "abierta con efectos en proceso";
    }

    await bolsa.save();

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

    const finalEfecto = await Efecto.findByPk(newEfecto.id, { include: { all: true } }); //* Me traigo el efecto actulizado con los modelos de Sims, Sds y Discos

    return res.status(200).json(finalEfecto);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = addEfecto;
