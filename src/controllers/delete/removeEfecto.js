const removeEfecto = require("express").Router();
const { Efecto, Bolsa, Acta } = require("../../db");

removeEfecto.delete("/", async (req, res) => {
  try {
    const efecto = await Efecto.findByPk(req.query.efecto_id); //* Me traigo el efecto
    const bolsa = await Bolsa.findByPk(efecto.bolsa_id, { include: { all: true, nested: true } }); //* Me traigo la bolsa a partir del bolsa_id del efecto

    if (bolsa.estado === "abierta con efectos en proceso") {
      //* Si la bolsa tiene elementos en proceso
      if (efecto.estado === "en proceso") {
        //* El efecto a eliminar esta en proceso
        const isAnotherInProcess = bolsa.Efectos.filter((e) => e.estado === "en proceso" && e.id !== efecto.id); //* Filtro los efectos de la bolsa para buscar mas en proceso
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
        bolsa.estado = "abierta sin efectos"; //* Cambio estado y guardo
        await bolsa.save();
      }
    }

    //* Borro el efecto y lo guardo
    await efecto.destroy();
    await efecto.save();

    //* Me traigo el acta actualizada y completa con todas sus relaciones
    const updatedActa = await Acta.findOne({ where: { id: bolsa.acta_id }, include: { all: true, nested: true } });

    const newEfectos = [];
    updatedActa.Bolsas.forEach((b) => {
      //* Mapeo las bolsas del acta
      b.Efectos.forEach((e) => {
        //* Mapeo los efectos de cada bolsa
        newEfectos.push(e); //* Inyecto al array de newEfectos cada efectos para mandarlos al FE
      });
    });

    return res.status(200).send(newEfectos);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = removeEfecto;

/*
?   Esta logica cumple la fucion de eliminar un Efecto, lo que pasa que hay que chequear el estado de la bolsa en la que se elimina,
?   por eso validamos si hay o no hay mas efectos, y dependiendo de eso y de si estan en proceso o completos,
?   cambiar el estado de la bolsa y que se actualice en tiempo real en el FE.

?   -RFD

*/