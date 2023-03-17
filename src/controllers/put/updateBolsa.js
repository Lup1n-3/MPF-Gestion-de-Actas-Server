const updateBolsa = require("express").Router();
const { Bolsa, Acta } = require("../../db");

updateBolsa.put("/", async (req, res) => {
  const { nroPrecintoBlanco, id, leyenda } = req.body;

  try {
    const bolsa = await Bolsa.findByPk(id, { include: { all: true, nested: true } }); //* Me traigo la bolsa con sus relaciones
    const acta = await Acta.findByPk(bolsa.acta_id, { include: { all: true, nested: true } });
    const changeStates = async () => {
      //* Separo las bolsas cerradas en proceso y abiertas
      const bagsInProcessToClose = acta.Bolsas.filter((b) => b.estado === "abierta con efectos en proceso");
      const bagsInProcess = acta.Bolsas.filter((b) => b.estado === "cerrada en proceso");

      if (bagsInProcessToClose.length > 0) {
        //* Si el acta sigue teniendo bolsas para cerrar sigue con estado = "en creacion"
        await Acta.update({ estado: "en creacion" }, { where: { id: bolsa.acta_id } });
      } else if (bagsInProcess.length > 0) {
        //* Si el acta solo tiene bolsas en proceso pone el estado = "en proceso"
        await Acta.update({ estado: "en proceso" }, { where: { id: bolsa.acta_id } });
      } else {
        await Acta.update({ estado: "completa" }, { where: { id: bolsa.acta_id } });
      }
    };

    if (!leyenda) {
      //* si no tiene leyenda, agrego precinto blanco y cierro la bolsa
      bolsa.nroPrecintoBlanco = nroPrecintoBlanco;
      bolsa.estado = "cerrada";
      await bolsa.save();

      await changeStates(); //* actualizo estados
    } else {
      //* Si tiene leyenda agrego la leyenda y dejo la bolsa en proceso
      bolsa.leyenda = leyenda;
      bolsa.estado = "cerrada en proceso";
      await bolsa.save();

      await changeStates(); //* Actualizo estados
    }

    res.status(200).send(bolsa);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = updateBolsa;
