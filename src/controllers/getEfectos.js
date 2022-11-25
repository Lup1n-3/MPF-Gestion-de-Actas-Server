const getEfectos = require("express").Router();
const { Efecto } = require("../db");

getEfectos.get("/", async (req, res) => {
  try {
    const efectos = await Efecto.findAll({ include: { all: true } }); //* Guardo todos los efectos

    return res.status(200).json(efectos);
  } catch (err) {
    console.log(err);
  }
});

getEfectos.get("/:id", async (req, res) => {
  // * solo por ID
  const id = req.params.id; //* ID del acta

  try {
    const efectos = await Efecto.findAll({
      include: { all: true },
    });

    const response = efectos.filter((efecto) => efecto.Bolsa.acta_id === Number(id)); //* Busca los efectos del acta que nos pasan por params

    if (response !== null) {
      return res.status(200).send(response);
    } else {
      return res.status(404).send("Efecto not found or not exist");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = getEfectos;
