import React from "react";
import axios from "axios";

import {
  Table,
  Button,
  CardBody,
  Card,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

class Alunos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      email: "",
      nome: "",
      alunos: []
    };
  }


  componentDidMount() {
    this.getAlunoFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000);
      this.setState({ intervalIsSet: interval });
    }
  }

  editarAluno = (e, id, key) => {
    const valor = e.target.value;
    this.setState(prevState => ({
      alunos: prevState.alunos.map(aluno => (
        aluno._id === id ? {...aluno, [key]: valor} : aluno)
      )
    }));
  }

  getAlunoFromDb = () => {
    fetch("http://localhost:3001/api/alunos")
      .then(data => data.json())
      .then(res => this.setState({ alunos: res.data }));
  };

  createAluno = () => {
    axios.post("http://localhost:3001/api/aluno", {
      nome: this.state.nome,
      email: this.state.email
    }).then(() => this.getAlunoFromDb());
  };

  deleteAlunoFromDb = id => {
    axios.delete(`http://localhost:3001/api/aluno/${id}`, {
      data: {
        id
      }
    }).then(() => this.getAlunoFromDb())
  }

  updateAlunoFromDb = id => {
    const updatedAluno = this.state.alunos.find(aluno => aluno._id === id);
    axios.post(`http://localhost:3001/api/updateAluno/${id}`, {
      id,
      update: {
        nome: updatedAluno.nome,
        email: updatedAluno.email
      }
    }).then(() => this.getAlunoFromDb());
  };

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  render() {
    return (
      <div style={{ marginTop: "100px"}}>
        <h3>
          Adicionar Aluno
        </h3>
        <div>
          <Form>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="email"
              />
            </FormGroup>
            <FormGroup>
              <Label for="nomeField">Nome</Label>
              <Input
                type="text-field"
                name="nome"
                onChange={(e) => this.setState({ nome: e.target.value })}
                value={this.state.nome}
                id="nomeField"
                placeholder="nome"
              />
            </FormGroup>
            <Row>
              <Col xs={10} />
              <Col xs={2}>
                <Button
                  color="success"
                  onClick={this.createAluno}
                >
                  Create +
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
        <Card>
          <CardBody>
            <Table responsive>
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.alunos.map((aluno, index) => (
                  <tr key={aluno._id}>
                    <td className="text-center">
                      {index + 1}
                    </td>
                    <td>
                      <Input
                        value={aluno.nome}
                        onChange={e => this.editarAluno(e, aluno._id, "nome")}
                        type="email"
                        name="nome"
                        placeholder="Nome"
                      />
                    </td>
                    <td>
                      <Input
                        value={aluno.email}
                        onChange={e => this.editarAluno(e, aluno._id, "email")}
                        type="email"
                        name="email"
                        id="exampleEmail"
                        placeholder="email"
                      />
                    </td>
                    <td>
                      {aluno.dataNasc}
                    </td>
                    <td className="text-right">
                      <Button
                        icon
                        color="success"
                        size="sm"
                        onClick={() => this.updateAlunoFromDb(aluno._id)}
                      >
                        <i className="now-ui-icons ui-2_settings-90"></i>
                      </Button>{` `}
                      <Button
                        onClick={() => this.deleteAlunoFromDb(aluno._id)}
                        icon
                        color="danger"
                        size="sm"
                      >
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                      </Button>
                    </td>
                  </tr>
                  ))
                }
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Alunos;
