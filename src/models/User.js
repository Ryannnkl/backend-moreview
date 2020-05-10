const mongoose = require("mongoose");

const UserSchma = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  favorites: {
    type: [mongoose.Types.ObjectId],
    ref: "Book"
  }
});

module.exports = mongoose.model("User", UserSchma);
