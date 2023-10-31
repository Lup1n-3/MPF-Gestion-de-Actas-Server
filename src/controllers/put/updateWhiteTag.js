const updateWhiteTag = require("express").Router();
const { Bolsa } = require("../../db");

updateWhiteTag.put("/", async (req, res) => {
  const { bolsaId, nroPrecintoBlanco } = req.body;

  try {
    const bolsa = await Bolsa.findByPk(bolsaId, { include: { all: true, nested: true } });

    await Bolsa.update({ nroPrecintoBlanco: nroPrecintoBlanco }, { where: { id: bolsaId } });

    res.status(200).send(bolsa);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = updateWhiteTag;
