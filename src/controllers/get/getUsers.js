const getUsers = require("express").Router();
const { User } = require("../../db");

getUsers.get("/", async (req, res) => {
  try {
    const users = await User.findAll();

    if (users) {
      return res.status(200).json(users);
    }

    return res.status(400).send("Usuarios no encontrados");
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: err });
  }
});

module.exports = getUsers;
