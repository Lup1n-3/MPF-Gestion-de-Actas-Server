const addEfecto = require("express").Router();
const { Efecto, Sim, Disco, Sd, Bolsa, Extraccion, TipoExtraccion } = require("../../db");

addEfecto.post("/", async (req, res) => {
  try {
    const { bolsa_id } = req.query;
    const { efecto, discos, sims, sds, extracciones } = req.body;

    const atLeastOneDiskInProcess = discos.some((d) => d.estadoDisco === "en proceso");

    if (["notebook", "gabinete"].includes(efecto.tipoDeElemento)) {
      efecto.estado = atLeastOneDiskInProcess ? "en proceso" : "completo";
    }

    if (efecto.estado === "peritado") {
      efecto.processToCompleteEfecto = "false";
    }

    const efectos = await Efecto.findAll({ where: { bolsa_id } });
    const allEffectsComplete = efectos.every((e) => e.estado === "completo");

    const bolsaEstado =
      efecto.estado === "en proceso"
        ? "abierta con efectos en proceso"
        : allEffectsComplete
        ? "abierta con efectos completos"
        : "abierta con efectos en proceso";

    const bolsa = await Bolsa.findByPk(bolsa_id);
    bolsa.estado = bolsaEstado;
    await bolsa.save();

    const newEfecto = await Efecto.create(
      {
        bolsa_id: bolsa_id,
        ...efecto,
        Sims: sims,
        Discos: discos,
        Sds: sds,
      },
      { include: [Sim, Disco, Sd] }
    );

    await Promise.all(
      extracciones.map(async (e) => {
        const newExtraccion = await Extraccion.create({ efecto_id: newEfecto.id, herramientaSoft: e.herramientaSoft });

        await Promise.all(
          e.TipoExtraccions.map(async (t) => {
            const newTipo = { ...t, extraccion_id: newExtraccion.id };
            await TipoExtraccion.create(newTipo);
          })
        );
      })
    );

    const finalEfecto = await Efecto.findByPk(newEfecto.id, { include: [Sim, Disco, Sd] });

    return res.status(200).json(finalEfecto);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = addEfecto;
