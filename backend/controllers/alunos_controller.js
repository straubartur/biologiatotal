const Aluno = require("../models/aluno");

exports.get = (req, res) => {
  Aluno.find((err, data) => {
    console.log(data)
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
}

exports.post = (req, res) => {
  const { id, update } = req.body;
  Aluno.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
}

exports.delete = (req, res) => {
  const { id } = req.body;
  Aluno.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
}

exports.create = (req, res) => {
  let aluno = new Aluno();
  const { id, nome, email } = req.body;
  if (!nome || !email) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  aluno.nome = nome;
  aluno.email = email
  aluno.save((err, data )=> {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data });
  });
}
