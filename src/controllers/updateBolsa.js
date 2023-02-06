const updateBolsa = require("express").Router();
const { Bolsa, Acta } = require("../db");

updateBolsa.put("/", async (req, res) => {
  const { nroPrecintoBlanco, nroPrecinto, leyenda } = req.body;

  if (!leyenda) {
    try {
      const bolsa = await Bolsa.findOne({ where: { nroPrecinto: nroPrecinto } });

      bolsa.nroPrecintoBlanco = nroPrecintoBlanco;
      bolsa.estado = "cerrada";
      bolsa.save();

      const acta = await Acta.findByPk(bolsa.acta_id, { include: { all: true } });
      acta.Bolsas.map((b) => {
        if (acta.estado === "en proceso") return;
        if (b.estado === "cerrada en proceso") return (acta.estado = "en proceso");
        if (b.estado === "cerrada") return (acta.estado = "completo");
      });
      acta.save();

      res.status(200).json(bolsa);
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const bolsa = await Bolsa.findOne({ where: { nroPrecinto: nroPrecinto } });

      bolsa.leyenda = leyenda;
      bolsa.estado = "cerrada en proceso";
      bolsa.save();

      const acta = await Acta.findByPk(bolsa.acta_id, { include: { all: true } });
      acta.Bolsas.map((b) => {
        if (acta.estado === "en proceso") return;
        if (b.estado === "cerrada en proceso") return (acta.estado = "en proceso");
        if (b.estado === "cerrada") return (acta.estado = "completo");
      });
      acta.save();

      res.status(200).json(bolsa);
    } catch (err) {
      console.log(err);
    }
  }
});

module.exports = updateBolsa;
