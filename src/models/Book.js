const mongoose = require("mongoose");
const aws = require("aws-sdk");
const path = require("path");
const fs = require("fs");
const { promisify } = require("util");
const s3 = new aws.S3();

const BookSchema = new mongoose.Schema(
  {
    book_img: String,
    book_url: String,
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

BookSchema.pre("save", function () {
  if (!this.book_url) {
    this.book_url = `${process.env.APP_URL}/files/${this.book_img}`;
  }
});

BookSchema.pre("remove", function () {
  if (process.env.STORAGE_TYPE === "s3") {
    return s3
      .deleteObject({
        Bucket: "upload-moreview",
        Key: this.book_img,
      })
      .promise();
  } else {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "..", "uploads", this.book_img)
    );
  }
});

module.exports = mongoose.model("Book", BookSchema);
