const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    book_img: String,
    author: String,
    title: String,
    generes: [String],
    reviews: [String],
    snopses: String,
    note: {
      type: Number,
      min: 0,
      default: 0,
    },
    subtitle: {
      type: String,
      required: false,
      default: "",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

BookSchema.virtual("book_img_url").get(function () {
  return `http://192.168.100.132:3333/files/${this.book_img}`;
});

module.exports = mongoose.model("Book", BookSchema);
