const Book = require("../models/Book");
const Calc = require("./utils/Calculate");

module.exports = {
  async setNote(req, res) {
    const { post_id, note } = req.headers;

    const book = await Book.findById(post_id);

    const note_alt = Calc(book.note, note);

    console.log(note);

    await Book.updateOne({ _id: post_id }, { $set: { note: note_alt } });

    return res.json({ ok: book });
  },

  async setReview(req, res) {},
};
