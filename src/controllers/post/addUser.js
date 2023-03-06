const addUser = require("express").Router();
const { User } = require("../../db");

addUser.post("/", async (req, res) => {
  try {
    //* Verificar si el usuario ya existe por legajo
    const existingUser = await User.findOne({ where: { legajo: req.body.legajo } });
    if (existingUser) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    //* Si el usuario no existe, crearlo
    const newUser = await User.create(req.body);

    res.status(201).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
});

module.exports = addUser;
