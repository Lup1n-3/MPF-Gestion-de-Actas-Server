const closeProcessActa = require("express").Router();
const { Acta, Perito, Integrante, Bolsa, Efecto, Sd, Sim, Disco, Extraccion, TipoExtraccion } = require("../../db");

closeProcessActa.put("/", async (req, res) => {
  const fecha = new Date();
  const horas = fecha.getHours().toString().padStart(2, "0");
  const minutos = fecha.getMinutes().toString().padStart(2, "0");
  let mes = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(fecha);

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
      processToComplete: "true", //! Agrego flag processToComplete pary a que la reconozca el template
      dias: fecha.getDate(),
      mes: mes.charAt(0).toUpperCase() + mes.slice(1),
      anio: fecha.getFullYear(),
      hora: `${horas}:${minutos}`,
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
        locacion: i.locacion,
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
        fecha: b.fecha,
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
          descripcionElemento: e.descripcionElemento,
          imei: e.imei,
          serialNumber: e.serialNumber,
          tipoSeguridad: e.tipoSeguridad,
          desbloqueo: e.desbloqueo,
          estado: "completo", //! Le cambio el estado a "completo" ya que para esto es esta logica
          processToCompleteEfecto: e.estado === "completo" ? "false" : "", //! Si estaba completo, se imprime resumido, sino normal
          almacenamiento: e.almacenamiento,
          encendido: e.encendido,
          observacionEncendido: e.observacionEncendido,
          elementoFallado: e.elementoFallado,
          observacionFalla: e.observacionFalla,
          tipoDeDisco: e.tipoDeDisco,
          color: e.color,
          unidadAlmacenamientoDetalle: e.unidadAlmacenamientoDetalle,
        });
        //* Mapeo y creo cada elemento del Efecto si es que existe
        e.Sds.forEach(async (sd) => {
          await Sd.create({
            efecto_id: newEfecto.id,
            marca: sd.marca,
            serialNumber: sd.serialNumber,
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
            adquisicion: disco.adquisicion,
            discoFallado: disco.discoFallado,
            observacionFallaDisco: disco.observacionFallaDisco,
            estadoDisco: "completo", //! Cambio el estado del disco tambien
          });
        });
        e.Extraccions.forEach(async (extraccion) => {
          const newExtraccion = await Extraccion.create({
            efecto_id: newEfecto.id,
            herramientaSoft: extraccion.herramientaSoft,
          });

          extraccion.TipoExtraccions.forEach(async (tipo) => {
            await TipoExtraccion.create({
              extraccion_id: newExtraccion.id,
              nombre: tipo.nombre,
              estado: tipo.estado,
              observacionFalla: tipo.observacionFalla,
            });
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
