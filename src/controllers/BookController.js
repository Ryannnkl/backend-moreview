const Book = require("../models/Book");

module.exports = {
  async store(req, res) {
    const { title, snopses, subtitle, author, generes } = req.body;
    const { key, location: url = "" } = req.file;

    const book = await Book.create({
      title,
      subtitle,
      snopses,
      author,
      generes: generes.split(",").map((genere) => genere.trim()),
      book_img: key,
      book_url: url,
    });

    return res.json(book);
  },

  async index(req, res) {
    const books = await Book.find().sort({ _id: "desc", author: -1 }).limit(5);
    const cont = await Book.count();

    return res.json({ data: books, cont: cont });
  },
};
