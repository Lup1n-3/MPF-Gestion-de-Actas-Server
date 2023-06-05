const updateBolsa = require("express").Router();
const { Bolsa, Acta } = require("../../db");

const changeStates = async (acta_id) => {
  const acta = await Acta.findByPk(acta_id, { include: { all: true, nested: true } });
  //* Bolsas abiertas
  const bagsInProcessToClose = acta.Bolsas.filter((b) => b.estado === "abierta con efectos en proceso");
  const bagsCompletedToClose = acta.Bolsas.filter((b) => b.estado === "abierta con efectos completos");
  //* Bolsas cerradas
  const bagsInProcess = acta.Bolsas.filter(
    (b) => b.estado === "cerrada en proceso" || b.estado === "abierta en proceso con elementos completos"
  );
  const bagsCompleted = acta.Bolsas.filter((b) => b.estado === "cerrada");

  if (bagsInProcessToClose.length > 0 || bagsCompletedToClose.length > 0) {
    //* Si el acta sigue teniendo bolsas para cerrar sigue con estado = "en creacion"
    await Acta.update({ estado: "en creacion" }, { where: { id: acta_id } });
  } else if (bagsInProcess.length > 0) {
    //* Si el acta tiene alguna bolsa en proceso pone el estado = "en proceso"
    await Acta.update({ estado: "en proceso" }, { where: { id: acta_id } });
  } else if (bagsInProcess.length === 0 && bagsCompleted.length > 0) {
    //* Pone estado completa solo si no tiene bolsas en proceso y tiene solo completas
    await Acta.update({ estado: "completa" }, { where: { id: acta_id } });
  }
};

updateBolsa.put("/", async (req, res) => {
  const { nroPrecintoBlanco, id, leyenda } = req.body;

  try {
    const bolsa = await Bolsa.findByPk(id, { include: { all: true, nested: true } });

    if (!leyenda) {
      //* si no tiene leyenda, agrego precinto blanco y cierro la bolsa
      console.log("llegue aca");
      await Bolsa.update({ nroPrecintoBlanco: nroPrecintoBlanco, estado: "cerrada" }, { where: { id: id } });
      await changeStates(bolsa.acta_id); //* actualizo estados
    } else {
      //* Si tiene leyenda agrego la leyenda y dejo la bolsa en proceso
      await Bolsa.update({ leyenda: leyenda, estado: "cerrada en proceso" }, { where: { id: id } });
      await changeStates(bolsa.acta_id); //* Actualizo estados
    }

    res.status(200).send(bolsa);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

updateBolsa.put("/:leaveInProcess", async (req, res) => {
  const { id } = req.body;

  try {
    const bolsa = await Bolsa.findByPk(id);
    if (!bolsa) {
      return res.status(404).send("Bolsa no encontrada");
    }
    await Bolsa.update({ estado: "abierta en proceso con elementos completos" }, { where: { id: id } });

    await changeStates(bolsa.acta_id); //* Actualizo estados

    res.status(200).send(bolsa);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = updateBolsa;
