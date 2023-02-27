const updateBolsa = require("express").Router();
const { Bolsa, Acta } = require("../../db");

updateBolsa.put("/", async (req, res) => {
  const { nroPrecintoBlanco, id, leyenda } = req.body;

  const bolsa = await Bolsa.findByPk(id, { include: { all: true, nested: true } });

  const changeStates = async () => {
    const acta = await Acta.findByPk(bolsa.acta_id, { include: { all: true } });

    const bagsInProcessToClose = acta.Bolsas.filter((b) => b.estado === "abierta con efectos en proceso");
    const bagsInProcess = acta.Bolsas.filter((b) => b.estado === "cerrada en proceso");

    if (bagsInProcessToClose.length > 0) {
      acta.estado = "en creacion";
    } else if (bagsInProcess.length > 0) {
      acta.estado = "en proceso";
    } else {
      acta.estado = "completa";
    }
    await acta.save();
  };

  if (!leyenda) {
    //* BOLSA CERRADA
    try {
      bolsa.nroPrecintoBlanco = nroPrecintoBlanco;
      bolsa.estado = "cerrada";
      await bolsa.save();

      changeStates();
    } catch (err) {
      console.log(err);
    }
  } else {
    //* BOLSA EN PROCESO
    try {
      bolsa.leyenda = leyenda;
      bolsa.estado = "cerrada en proceso";
      await bolsa.save();

      changeStates();
    } catch (err) {
      console.log(err);
    }
  }

  res.status(200).send(bolsa);
});

module.exports = updateBolsa;
