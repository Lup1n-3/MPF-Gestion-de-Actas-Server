const editEfecto = require("express").Router();
const { Acta, Efecto, Sim, Sd, Disco } = require("../../db");

editEfecto.put("/", async (req, res) => {
  const { efecto, discos, sims, sds, acta_id } = req.body;

  try {
    // Actualiza el efecto existente
    await Efecto.update(efecto, { where: { id: efecto.id } });

    // Crea y relaciona los nuevos elementos
    await Promise.all(
      sims.map(async (sim) => {
        const nuevoSim = await Sim.create({ ...sim, efecto_id: efecto.id });
        return nuevoSim;
      })
    );

    await Promise.all(
      sds.map(async (sd) => {
        const nuevoSd = await Sd.create({ ...sd, efecto_id: efecto.id });
        return nuevoSd;
      })
    );

    await Promise.all(
      discos.map(async (disco) => {
        const nuevoDisco = await Disco.create({ ...disco, efecto_id: efecto.id });
        return nuevoDisco;
      })
    );

    // Busca todos los efectos relacionados con el acta
    const acta = await Acta.findByPk(acta_id, { include: { all: true, nested: true } });
    const efectos = [];
    acta.Bolsas.map((b) => {
      efectos.push(...b.Efectos);
    });

    return res.status(200).json(efectos);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = editEfecto;
