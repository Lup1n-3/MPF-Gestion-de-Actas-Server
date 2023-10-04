const addPropsToEfecto = require("express").Router();
const { Sim, Sd, Disco } = require("../../db");

addPropsToEfecto.put("/", async (req, res) => {
  const { id, type } = req.body;

  switch (type) {
    case "sim":
      try {
        const sim = await Sim.findOne({ where: { id: id } });
        sim.processToCompleteSim = "true";
        sim.save();
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      break;
    case "sd":
      try {
        const sd = await Sd.findOne({ where: { id: id } });
        sd.processToCompleteSd = "true";
        sd.save();
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      break;
    case "disco":
      try {
        const disco = await Disco.findOne({ where: { id: id } });
        disco.processToCompleteDisco = "true";
        disco.save();
      } catch (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      break;
  }

  return res.status(201);
});

module.exports = addPropsToEfecto;
