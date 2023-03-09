const addUser = require("express").Router();
const { User } = require("../../db");

addUser.post("/", async (req, res) => {
  const users = req.body;
  try {
    users.map(async (u) => {
      await User.findOrCreate({
        where: { legajo: u.legajo, username: u.username },
        defaults: {
          nombreYApellido: u.nombreYApellido,
          legajo: u.legajo,
          cargo: u.cargo,
          username: u.username,
          password: u.password,
        },
      });
    });

    const newUsers = await User.findAll();

    if (newUsers) {
      return res.status(200).json(newUsers);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
});

module.exports = addUser;
