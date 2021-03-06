const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const init = require("./controllers/init.controller.js")
const alunosController = require("./controllers/alunos_controller.js")
const cursoController = require("./controllers/curso_controller.js")
const matriculasController = require("./controllers/matriculas_controller.js")
const path = require("path");

const app = express();
app.use(cors());
const router = express.Router();

const dbRoute = "mongodb://mongoose1:mongoose1@ds121406.mlab.com:21406/bdr_teste";

mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);

const db = mongoose.connection;
db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

require('./controllers/alunos_controller.js')(router);
require('./controllers/curso_controller.js')(router);
require('./controllers/matriculas_controller.js')(router);

app.use("/api", router);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"))

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  })
}

const API_PORT = process.env.PORT || 3001;

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
