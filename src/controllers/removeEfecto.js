const removeEfecto = require("express").Router();
const { Efecto, Bolsa, Acta } = require("../db");

removeEfecto.delete("/", async (req, res) => {
  const { efecto_id } = req.query;

  try {
    const efecto = await Efecto.findByPk(efecto_id);
    const bolsa = await Bolsa.findByPk(efecto.bolsa_id, { include: { all: true } });

    if (bolsa.estado === "abierta con efectos en proceso") {
      //* La bolsa tiene elementos en proceso
      if (efecto.estado === "en proceso") {
        //* El efecto a eliminar esta en proceso
        const isAnotherInProcess = bolsa.Efectos.filter((e) => e.estado === "en proceso" && e.id !== efecto.id);
        if (isAnotherInProcess.length == 0) {
          //* No hay mas efectos en proceso en la bolsa
          bolsa.estado = "abierta con efectos completos"; //* cambio estado y guardo
          await bolsa.save();
        }
      }
    } else {
      //* Si hay efectos en la bolsa estan completos, filtro y si no hay nada cambio estado y guardo
      const isBagEmpty = bolsa.Efectos.filter((e) => e.id !== efecto.id);
      if (isBagEmpty.length == 0) {
        //* Esta vacia
        bolsa.estado = "abierta sin efectos";
        await bolsa.save();
      }
    }

    //* Borro el efecto y lo guardo
    await efecto.destroy();
    await efecto.save();

    const updatedActa = await Acta.findOne({ where: { id: bolsa.acta_id }, include: { all: true, nested: true } });

    const newEfectos = [];
    updatedActa.Bolsas.forEach((b) => {
      b.Efectos.forEach((e) => {
        newEfectos.push(e);
      });
    });

    return res.status(200).send(newEfectos);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = removeEfecto;
