const closeProcessActa = require("express").Router();
const { Acta, Perito, Integrante, Bolsa, Efecto, Sd, Sim, Disco } = require("../../db");

const fecha = new Date();
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
  try {
    //* Depreco el acta actual
    const deprecatedActa = await Acta.findByPk(req.query.acta_id, { include: { all: true, nested: true } });
    deprecatedActa.estado = "deprecada";
    deprecatedActa.save();

    //* Creo un acta nueva a partir de la deprecada
    const newActa = await Acta.create({
      nro_mpf: deprecatedActa.nro_mpf,
      nro_dil: deprecatedActa.nro_dil,
      nro_cij: deprecatedActa.nro_cij,
      nro_coop: deprecatedActa.nro_coop,
      nro_causa: deprecatedActa.nro_causa,
      solicitante: deprecatedActa.solicitante,
      caratula: deprecatedActa.caratula,
      estado: "para completar", //! Pongo estado "para completar" para que el FE la reconozca como una copia de un acta
      processToComplete: "true", //! Agrego flag processToComplete para que la reconozca el template
      dias: fecha.getDate(),
      mes: formatMonth(fecha.getMonth()),
      anio: fecha.getFullYear(),
      hora: `${fecha.getHours()}:${fecha.getMinutes()}`,
    });

    //* Creo los peritos nuevos a partir de los deprecados
    deprecatedActa.Peritos.forEach(async (p) => {
      await Perito.create({
        acta_id: newActa.id,
        nombreYApellido: p.nombreYApellido,
        cargo: p.cargo,
        legajo: p.legajo,
      });
    });

    //* Creo los integrantes nuevos a partir de los deprecados
    deprecatedActa.Integrantes.forEach(async (i) => {
      await Integrante.create({
        acta_id: newActa.id,
        nombreYApellido: i.nombreYApellido,
        cargo: i.cargo,
        legajoOMatricula: i.legajoOMatricula,
      });
    });

    //* Mapeo las bolsas del acta deprecada y creo una copia de todas
    deprecatedActa.Bolsas.forEach(async (b) => {
      //* Creo la bolsa nueva con los datos de la bolsa que estoy loopeando
      const newBolsa = await Bolsa.create({
        acta_id: newActa.id,
        nroPrecinto: b.nroPrecinto,
        colorPrecinto: b.colorPrecinto,
        observaciones: b.observaciones,
        leyenda: b.leyenda,
        nroPrecintoBlanco: b.estado === "cerrada" ? b.nroPrecintoBlanco : null, //! Si estaba cerrada, queda cerrada. Sino, queda sin precinto
        estado: b.estado === "cerrada" ? b.estado : "abierta con efectos completos", //! Si estaba cerrada, queda cerrada. Sino, cambio estado para que permita el cierre
        processToCompleteBolsa: b.estado === "cerrada" ? "false" : "true", //! Si estaba cerrada, no se imprime en el template. Sino, si
      });

      //* Mapeo los efectos deprecados de las bolsas! y creo una copia de todos
      b.Efectos.forEach(async (e) => {
        //* Creo el efecto nuevo con los datos del efecto que estoy loopeando
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
          estado: "completo", //! Le cambio el estado a "completo" ya que para esto es esta logica
          extraccion: e.extraccion,
          almacenamiento: e.almacenamiento,
          encendido: e.encendido,
          observacionEncendido: e.observacionEncendido,
          elementoFallado: e.elementoFallado,
          observacionFalla: e.observacionFalla,
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
            herramientaSoftDisco: disco.herramientaSoftDisco,
            estadoDisco: "completo", //! Cambio el estado del disco tambien
          });
        });
      });
    });

    return res.status(200).send(newActa);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = closeProcessActa;

/*
?   Esta logica sirve y cumple la funcion de DEPRECAR un acta con efectos EN PROCESO para crear una copia de la misma,
?   cambiar los efectos a completos y poder agregarle precintos blancos a las bolsas que estaban en proceso en el acta que ahora en la DB va a quedar deprecada,
?   de esta forma de genera un registro del acta. El acta deprecada no va a aparecer en los registros del FE, excepto en la seccion de ADMIN.

?   -RFD
*/
