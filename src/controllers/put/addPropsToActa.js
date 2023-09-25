const addPropsToActa = require("express").Router();
const { Acta } = require("../../db");

addPropsToActa.put("/", async (req, res) => {
  const actaId = req.body.id;

  console.log(actaId);

  try {
    const acta = await Acta.findOne({ where: { id: actaId } });
    acta.processToComplete = "true";
    acta.save();

    return res.status(200).send("Acta actualizada");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = addPropsToActa;
