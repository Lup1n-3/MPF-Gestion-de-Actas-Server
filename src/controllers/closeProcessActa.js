const closeProcessActa = require("express").Router();
const { Acta, Perito, Integrante, Bolsa } = require("../db");

const formatMonth = (month) => {
  switch (month + 1) {
    case 1: {
      return "Enero";
    }
    case 2: {
      return "Febrero";
    }
    case 3: {
      return "Marzo";
    }
    case 4: {
      return "Abril";
    }
    case 5: {
      return "Mayo";
    }
    case 6: {
      return "Junio";
    }
    case 7: {
      return "Julio";
    }
    case 8: {
      return "Agosto";
    }
    case 9: {
      return "Septiembre";
    }
    case 10: {
      return "Octubre";
    }
    case 11: {
      return "Noviembre";
    }
    case 12: {
      return "Diciembre";
    }
    default: {
      return month;
    }
  }
};

closeProcessActa.put("/", async (req, res) => {
  const id = req.query.acta_id;
  const fecha = new Date();

  try {
    //* Depreco el acta
    const acta = await Acta.findByPk(id, { include: { all: true } });
    acta.estado = "deprecada";
    acta.save();

    //* Creo el acta nueva
    const newActa = await Acta.create({
      nro_mpf: acta.nro_mpf,
      nro_dil: acta.nro_dil,
      nro_cij: acta.nro_cij,
      nro_coop: acta.nro_coop,
      nro_causa: acta.nro_causa,
      solicitante: acta.solicitante,
      caratula: acta.caratula,
      dias: fecha.getDate(),
      mes: formatMonth(fecha.getMonth()),
      anio: fecha.getFullYear(),
      hora: `${fecha.getHours()}:${fecha.getMinutes()}`,
    });

    acta.Peritos.forEach(async (p) => {
      await Perito.create({
        acta_id: newActa.id,
        nombreYApellido: p.nombreYApellido,
        cargo: p.cargo,
        dni: p.dni,
      });
    });

    return res.status(200).send(newActa);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = closeProcessActa;
