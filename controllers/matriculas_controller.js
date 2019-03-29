const Matricula = require("../models/matricula");
const { ObjectId } = require('mongodb');

exports.get = (req, res) => {
  Matricula.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
}

exports.post = (req, res) => {
  const { id, update } = req.body;
  console.log(update)
  Matricula.findOneAndUpdate({ _id: ObjectId(id)}, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
}

exports.delete = (req, res) => {
  const { id } = req.body;
  console.log(id)
  Matricula.findOneAndDelete(ObjectId(id), err => {
    if (err) return res.send(err);
    return res.json({ success: true, id });
  });
}

exports.create = (req, res) => {
  let matricula = new Matricula();
  const { curso, aluno } = req.body;
  if (!curso || !aluno) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }

  matricula.curso = curso;
  matricula.aluno = aluno
  matricula.save((err, data )=> {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data });
  });
}
