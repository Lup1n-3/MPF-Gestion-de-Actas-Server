const downIntervencion = require("express").Router();
const { Intervencion } = require("../../db");

downIntervencion.put("/:id", async (req, res) => {
  const intervencionId = req.params.id;

  try {
    const intervencion = await Intervencion.findOne({ where: { id: intervencionId } });
    intervencion.estado = "inactiva";
    intervencion.save();

    return res.status(200).send("Intervencion actualizada");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = downIntervencion;
