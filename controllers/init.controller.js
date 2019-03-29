const Curso = require("../models/curso");
const Aluno = require("../models/aluno");
const Matricula = require("../models/matricula");

exports.initSeeds = (req, res) => {
  const matematica = new Curso({
    id: 1,
    titulo: 'Matematica'
  });

  const biologia = new Curso({
    id: 2,
    titulo: 'Biologia'
  });


  const artur = new Aluno({
    nome: "Artur",
    email: "straubartur@gmail.com",
  });

  const matricula1 = new Matricula({
  })
  matricula1.aluno = artur._id;
  matricula1.curso = matematica._id;

  matricula1.save(err => {
    if(err) return console.log(err.stack);
    console.log("Matricula Adicionada");
  });

  const matricula2 = new Matricula({
  })
  matricula2.aluno = artur._id;
  matricula2.curso = biologia._id;

  matricula2.save(err => {
    if(err) return console.log(err.stack);
    console.log("Matricula Adicionada");
  });
  matematica.matriculas.push(matricula1._id)
  matematica.save(err => {
   if(err) return console.error(err.stack)
   console.log("Matematica Adicionada")
  });

  biologia.matriculas.push(matricula2._id)
  biologia.save(err => {
    if(err) return console.error(err.stack);
    console.log("Biologia Adicionada")
  })

  artur.matriculas.push(matricula1._id, matricula2._id)

  artur.save(err => {
    if(err) return console.log(err.stack);
    console.log("Aluno Adicionado");
  });

  // Return Message
  res.send("Done Initial Data!");
}
