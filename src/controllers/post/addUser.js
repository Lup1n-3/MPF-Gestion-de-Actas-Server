const addUser = require("express").Router();
const { User } = require("../../db");

addUser.post("/", async (req, res) => {
  const users = req.body;
  try {
    for (const u of users) {
      const [user, created] = await User.findOrCreate({
        where: { legajo: u.legajo, username: u.username },
        defaults: {
          nombreYApellido: u.nombreYApellido,
          legajo: u.legajo,
          cargo: u.cargo,
          username: u.username,
          password: u.password,
        },
      });

      if (!created) {
        //? El usuario ya existía, actualiza sus datos
        await user.update({
          nombreYApellido: u.nombreYApellido,
          legajo: u.legajo,
          cargo: u.cargo,
          username: u.username,
          password: u.password,
        });
      }
    }

    const newUsers = await User.findAll();

    if (newUsers) {
      return res.status(200).json(newUsers);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear o modificar el usuario" });
  }
});

addUser.put("/", async (req, res) => {
  const user = req.body;

  try {
    const dbUser = await User.findOne({ where: { id: user.id } });

    await dbUser.update({
      nombreYApellido: user.nombreYApellido,
      legajo: user.legajo,
      cargo: user.cargo,
      username: user.username,
      password: user.password,
    });

    const allUsers = await User.findAll();

    return res.status(200).json(allUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear o modificar el usuario" });
  }
});

module.exports = addUser;
