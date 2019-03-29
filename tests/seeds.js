const Aluno = require('../models/Aluno');
const Curso = require('../models/Curso');
const Matricula = require('../models/Matricula');

const { ObjectID } = require('mongodb');

const alunoId = new ObjectID();
const alunoData = {
  _id: userId,
  nome: "Artur",
  email: "artur@artur.com",
};

const cursoId = new ObjectID();
const cursoData = {
  _id: cursoId,
  titulo: 'biologia',
  descricao: 'descricao1',
}

const matriculaId = new ObjectID();
const matriculaData = {
  _id: matriculaId,
  curso: cursoId,
  aluno: alunoId
}

const createDefaultAluno = (done) => {
  Aluno.remove({}).then(() => {
    const aluno = new Aluno(alunoData);
    return aluno.save();
  }).then(() => done());
};

const createDefaultCurso = (done) => {
  Curso.remove({}).then(() => {
    const curso = new Curso(cursoData);
    return curso.save();
  }).then(() => done());
};

const createDefaultMatricula = (done) => {
  Matricula.remove({}).then(() => {
    const matricula = new Matricula(matriculaData);
    return matricula.save();
  }).then(() => done());
};

module.exports = { createDefaultAluno, createDefaultCurso,
  createDefaultMatricula, alunoData, cursoData, matriculaData };
