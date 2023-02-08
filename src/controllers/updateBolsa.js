const updateBolsa = require("express").Router();
const { Bolsa, Acta } = require("../db");

updateBolsa.put("/", async (req, res) => {
  const { nroPrecintoBlanco, nroPrecinto, leyenda } = req.body;

  const bolsa = await Bolsa.findOne({ where: { nroPrecinto: nroPrecinto }, include: { all: true } });

  const changeStates = async () => {
    const acta = await Acta.findByPk(bolsa.acta_id, { include: { all: true } });
    let flag = false;
    acta.Bolsas.forEach((b) => {
      if (b.estado === "cerrada en proceso") {
        flag = "en proceso";
      } else if (b.estado === "cerrada") {
        flag = "cerrada";
      } else {
        flag = false;
      }
    });
    if (flag === "en proceso") {
      acta.estado = "en proceso";
    } else if (flag === "cerrada") {
      acta.estado = "completa";
    }
    acta.save();
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
