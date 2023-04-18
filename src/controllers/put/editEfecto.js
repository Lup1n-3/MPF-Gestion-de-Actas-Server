const editEfecto = require("express").Router();
const { Acta, Efecto, Sim, Sd, Disco, Bolsa } = require("../../db");

editEfecto.put("/", async (req, res) => {
  const { efecto, discos, sims, sds, acta_id } = req.body;

  try {
    //* Actualiza el efecto existente
    await Efecto.update(efecto, { where: { id: efecto.id } });

    //* Si el elemento es una notebook o un gabinete, actualizar estado en función de los discos
    if (efecto.tipoDeElemento === "notebook" || efecto.tipoDeElemento === "gabinete") {
      const atLeastOneDiskInProcess = discos.some((d) => d.estadoDisco === "en proceso");
      efecto.estado = atLeastOneDiskInProcess ? "en proceso" : "completo";

      await Efecto.update(efecto, { where: { id: efecto.id } });
    }

    //* Crea y relaciona los nuevos elementos
    await Promise.all(
      sims.map(async (sim) => {
        if (sim.edit) {
          return await Sim.update(sim, { where: { id: sim.id } });
        } else {
          const nuevoSim = await Sim.create({ ...sim, efecto_id: efecto.id });
          return nuevoSim;
        }
      })
    );

    await Promise.all(
      sds.map(async (sd) => {
        if (sd.edit) {
          return await Sd.update(sd, { where: { id: sd.id } });
        } else {
          const nuevoSd = await Sd.create({ ...sd, efecto_id: efecto.id });
          return nuevoSd;
        }
      })
    );

    await Promise.all(
      discos.map(async (disco) => {
        if (disco.edit) {
          return await Disco.update(disco, { where: { id: disco.id } });
        } else {
          const nuevoDisco = await Disco.create({ ...disco, efecto_id: efecto.id });
          return nuevoDisco;
        }
      })
    );

    //* Busca todos los efectos relacionados con el acta
    const acta = await Acta.findByPk(acta_id, { include: { all: true, nested: true } });
    const efectos = [];
    acta.Bolsas.map((b) => {
      efectos.push(...b.Efectos);
    });

    //* Actualiza el estado de la bolsa si es necesario
    const bolsa_id = efecto.bolsa_id;
    const efectosActuales = await Efecto.findAll({ where: { bolsa_id } });
    const allEffectsComplete = efectosActuales.every((e) => e.estado === "completo");

    const bolsaEstado =
      efecto.estado === "en proceso"
        ? "abierta con efectos en proceso"
        : allEffectsComplete
        ? "abierta con efectos completos"
        : "abierta con efectos en proceso";

    const bolsa = await Bolsa.findByPk(bolsa_id);
    bolsa.estado = bolsaEstado;
    await bolsa.save();

    return res.status(200).json(efectos);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = editEfecto;
