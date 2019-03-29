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
  descricao: 'jfsdkiw9843fjk',
}

const serviceId = new ObjectID();
const serviceData = {
  _id: serviceId,
  name: 'service_001',
  password: 'fkjsfk9839832'
}

const createDefaultUser = (done) => {
  User.remove({}).then(() => {
    const user = new User(userData);
    return user.save();
  }).then(() => done());
};

const createDefaultDevice = (done) => {
  Device.remove({}).then(() => {
    const device = new Device(deviceData);
    return device.save();
  }).then(() => done());
};

const createDefaultService = (done) => {
  Service.remove({}).then(() => {
    const service = new Service(serviceData);
    return service.save();
  }).then(() => done());
};

module.exports = { createDefaultUser, createDefaultDevice,
  createDefaultService, userData, deviceData, serviceData };
