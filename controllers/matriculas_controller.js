const Matricula = require("../models/matricula");

exports.get = (req, res) => {
  Matricula.find((err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
}

exports.post = (req, res) => {
  const { id, update } = req.body;
  Matricula.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
}

exports.delete = (req, res) => {
  const { id } = req.body;
  Matricula.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true, id });
  });
}

exports.create = (req, res) => {
  let matricula = new Matricula();
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }

  matricula.nome = nome;
  matricula.email = email
  matricula.save((err, data )=> {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data });
  });
}
