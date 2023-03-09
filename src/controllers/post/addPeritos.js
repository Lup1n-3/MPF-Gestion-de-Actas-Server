const addPeritos = require("express").Router();
const { Perito } = require("../../db");

addPeritos.post("/", async (req, res) => {
  try {
    const newPeritos = await Perito.bulkCreate(req.body);

    return res.status(200).json(newPeritos);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = addPeritos;
