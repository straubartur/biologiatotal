const Curso = require("../models/curso");
const { ObjectId } = require('mongodb');

exports.get = (req, res) => {
  Curso.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
}

exports.update = (req, res) => {
  const { id, update } = req.body;
  Curso.findOneAndUpdate({ _id: ObjectId(id)}, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
}

exports.delete = (req, res) => {
  const { id } = req.body;
  Curso.findOneAndDelete({ _id: ObjectId(id)}, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
}

exports.create = (req, res) => {
  const curso = new Curso();
  const { titulo, descricao } = req.body;
  if (!titulo || !descricao) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  curso.titulo = titulo;
  curso.descricao = descricao
  curso.save((err, data )=> {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data });
  });
}
