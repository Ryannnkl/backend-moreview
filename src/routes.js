const express = require("express");
const multer = require("multer");

const uploadConfig = require("./config/upload");

const SessionController = require("./controllers/SessionController");
const BookController = require("./controllers/BookController");
const ActionsBookController = require("./controllers/ActionsBookController");

const routes = express.Router();
const upload = multer(uploadConfig);

routes.get("/", (req, res) => {
  return res.send("<h1>Alisson vc é um cachorro</h1>");
});

routes.post("/session", SessionController.store);
routes.get("/session", SessionController.show);
routes.get("/session/list", SessionController.index);
routes.delete("/session", SessionController.delete);

routes.post("/book", upload.single("book_img"), BookController.store);
routes.get("/book/list", BookController.index);
routes.put("/book/set_note", ActionsBookController.setNote);

module.exports = routes;
