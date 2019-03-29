const expect = require("expect");
const request = require("supertest");
const Aluno = require('../models/Aluno');

const { router } = require('../server.js');

beforeEach(createDefaultAluno);

describe('GET /alunos', () => {
  it('should return list of users', (done) => {
    request(app)
      .get('/alunos')
      .expect(200)
      .expect((res)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Aluno.find((err, data) => {
          if (err) return res.json({ success: false, error: err });
          return res.json({ success: true, data: data });
        });

        Aluno.find((err, data)).then((aluno) => {
          expect(aluno.toObject()).toMatchObject({
            access: 'auth',
            token: res.headers['x-auth']
          });
          done();
        }).catch((e) => done(e));
      });
  });
