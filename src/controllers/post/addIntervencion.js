const addIntervencion = require("express").Router();
const { Intervencion, Actor } = require("../../db");

addIntervencion.post("/", async (req, res) => {
  try {
    const intervencion = await Intervencion.create(req.body.intervencion);
    const actoresWithId = req.body.actores.map((a) => {
      return { ...a, intervencion_id: intervencion.id };
    });

    await Actor.bulkCreate(actoresWithId);

    const finalIntervencion = await Intervencion.findOne({
      where: { id: intervencion.id },
      include: { all: true, nesterd: true },
    });

    return res.status(200).json(finalIntervencion);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = addIntervencion;
