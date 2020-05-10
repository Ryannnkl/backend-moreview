const User = require("../models/User");

module.exports = {
  async store(req, res) {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({ error: "O usuario ja existe" });
    }

    user = await User.create({
      name,
      email,
      password,
    });

    return res.json(user);
  },

  async show(res, req) {
    const { email, password } = req.query;

    const user = await User.findOne({
      email,
      password,
    });

    if (!user) {
      return res.status(404).json({ error: "usuario não encontrado" });
    }

    return res.json(user);
  },

  async index(req, res) {
    const users = await User.find();
    return res.json(users);
  },

  async delete(req, res) {
    const { user_id } = req.params;

    await User.findByIdAndRemove({ _id: user_id });

    return res.json({ ok: "Usuario deletado" });
  },
};
