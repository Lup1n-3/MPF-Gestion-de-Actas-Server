const closeProcessActa = require("express").Router();
const { Acta, Perito, Integrante, Bolsa, Efecto, Sd, Sim, Disco } = require("../db");

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
    const acta = await Acta.findByPk(id, { include: { all: true, nested: true } });
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
      estado: "para completar",
      processToComplete: "true",
      dias: fecha.getDate(),
      mes: formatMonth(fecha.getMonth()),
      anio: fecha.getFullYear(),
      hora: `${fecha.getHours()}:${fecha.getMinutes()}`,
    });
    //* Creo los peritos nuevos
    acta.Peritos.forEach(async (p) => {
      await Perito.create({
        acta_id: newActa.id,
        nombreYApellido: p.nombreYApellido,
        cargo: p.cargo,
        dni: p.dni,
      });
    });
    //* Creo los integrantes nuevos
    acta.Integrantes.forEach(async (i) => {
      await Integrante.create({
        acta_id: newActa.id,
        nombreYApellido: i.nombreYApellido,
        cargo: i.cargo,
        dni: i.dni,
        legajoOMatricula: i.legajoOMatricula,
      });
    });

    //* Mapeo las bolsas y creo la copia
    acta.Bolsas.forEach(async (b) => {
      const newBolsa = await Bolsa.create({
        acta_id: newActa.id,
        nroPrecinto: b.nroPrecinto,
        colorPrecinto: b.colorPrecinto,
        observaciones: b.observaciones,
        leyenda: b.leyenda,
        nroPrecintoBlanco: b.estado === "cerrada" ? b.nroPrecintoBlanco : null,
        estado: b.estado === "cerrada" ? b.estado : "abierta con efectos completos",
        processToCompleteBolsa: b.estado === "cerrada" ? "false" : "true",
      });

      //* Mapeo los efectos y creo la copia
      b.Efectos.forEach(async (e) => {
        const newEfecto = await Efecto.create({
          bolsa_id: newBolsa.id,
          tipoDeElemento: e.tipoDeElemento,
          marca: e.marca,
          modelo: e.modelo,
          imei: e.imei,
          serialNumber: e.serialNumber,
          tipoSeguridad: e.tipoSeguridad,
          desbloqueo: e.desbloqueo,
          herramientaSoft: e.herramientaSoft,
          tipoExtraccion: e.tipoExtraccion,
          estado: "completo",
          extraccion: e.extraccion,
          almacenamiento: e.almacenamiento,
        });

        //* Mapeo y creo cada elemento del Efecto si es que existe
        e.Sds.forEach(async (sd) => {
          await Sd.create({
            efecto_id: newEfecto.id,
            marca: sd.marca,
            modelo: sd.modelo,
            almacenamiento: sd.almacenamiento,
            tipoExtraccionSd: sd.tipoExtraccionSd,
          });
        });
        e.Sims.forEach(async (sim) => {
          await Sim.create({
            efecto_id: newEfecto.id,
            empresaSim: sim.empresaSim,
            serialSim: sim.serialSim,
            tipoExtraccionSim: sim.tipoExtraccionSim,
          });
        });
        e.Discos.forEach(async (disco) => {
          await Disco.create({
            efecto_id: newEfecto.id,
            tipoDeDisco: disco.tipoDeDisco,
            marca: disco.marca,
            modelo: disco.modelo,
            almacenamiento: disco.almacenamiento,
            serialNumber: disco.serialNumber,
            estadoDisco: "completo",
          });
        });
      });
    });

    return res.status(200).send(newActa);
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = closeProcessActa;
