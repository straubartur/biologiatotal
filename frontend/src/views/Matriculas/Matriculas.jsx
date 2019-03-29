import React from "react";
import axios from "axios";
import Select from "react-select";
import {
  Table,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  Row,
  Col,
} from "reactstrap";


class Matriculas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      curso: null,
      aluno: null,
      intervalIsSet: false,
      matriculas: [],
      cursos: [],
      alunos: [],
    };
  }

  componentDidMount() {
    this.getMatriculaFromDb();
    fetch("http://localhost:3001/api/alunos")
      .then(data => data.json())
      .then(res => this.setState({ alunos: res.data }));
    fetch("http://localhost:3001/api/cursos")
      .then(data => data.json())
      .then(res => this.setState({ cursos: res.data }));
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getMatriculaFromDb(), 20000);
      this.setState({ intervalIsSet: interval });
    }
  }

  editarMatricula = (e, id, key) => {
    const valor = e.value;
    this.setState(prevState => ({
      matriculas: prevState.matriculas.map(matricula => (
        matricula._id === id ? {...matricula, [key]: valor} : matricula)
        )
    }))
  }

  getMatriculaFromDb = () => {
    fetch("http://localhost:3001/api/matriculas")
      .then(data => data.json())
      .then(res => this.setState({ matriculas: res.data }));
  };

  createMatricula = () => {
    axios.post("http://localhost:3001/api/matricula", {
      curso: this.state.curso.value,
      aluno: this.state.aluno.value
    }).then(() => this.getMatriculaFromDb());
  };

  deleteMatriculaFromDb = id => {
    axios.delete(`http://localhost:3001/api/matricula/${id}`, {
      data: {
        _id: id
      }
    }).then(() => this.getMatriculaFromDb());
  }

  updateMatriculaFromDb = id => {
    const updatedMatricula = this.state.matriculas.find(
      matricula => matricula._id === id
    );
    axios.post(`http://localhost:3001/api/updateMatricula/${id}`, {
      id,
      update: {
        aluno: updatedMatricula.aluno,
        curso: updatedMatricula.curso
      }
    }).then(() => this.getMatriculaFromDb());
  };

  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet);
      this.setState({ intervalIsSet: null });
    }
  }

  handleChange = (e, key) => {
    this.setState({ [key]: e });
  }

  render() {
    const cursosOptions = this.state.cursos.map(curso => ({
      label: curso.titulo,
      value: curso._id
    }))
    const alunoOptions = this.state.alunos.map(aluno => ({
      label: aluno.nome,
      value: aluno._id
    }))
    console.log(this.state)
    return (
      <div style={{ marginTop: "100px"}}>
        <h3>
          Adicionar Matriculas
        </h3>
        <div>
          <Form>
            <FormGroup>
              <Label for="exampleSelect">Curso</Label>
              <Select
                id="exampleSelect"
                value={this.state.curso}
                onChange={e => this.handleChange(e, "curso")}
                options={cursosOptions}
              />
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Aluno</Label>
                <Select
                  id="exampleSelect"
                  value={this.state.aluno}
                  onChange={e => this.handleChange(e, "aluno")}
                  options={alunoOptions}
                />
            </FormGroup>
            <Row>
              <Col xs={10} />
              <Col xs={2}>
                <Button color="success" onClick={this.createMatricula}>Create +</Button>
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
                  <th>Aluno</th>
                  <th>Curso</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.matriculas.map((matricula, index) => (
                  <tr key={matricula._id}>
                    <td className="text-center">
                      {index + 1}
                    </td>
                    <td>
                      <Select
                        id="exampleSelect"
                        value={alunoOptions.find(aluno => aluno.value === matricula.aluno)}
                        onChange={e => this.editarMatricula(e, matricula._id, "aluno")}
                        options={alunoOptions}
                      />
                    </td>
                    <td>
                    <Select
                      id="exampleSelect"
                      value={cursosOptions.find(curso => curso.value === matricula.curso)}
                      onChange={e => this.editarMatricula(e, matricula._id, "curso")}
                      options={cursosOptions}
                    />
                    </td>
                    <td />
                    <td className="text-right">
                      <Button
                        icon
                        color="success"
                        size="sm"
                        onClick={() => this.updateMatriculaFromDb(matricula._id)}
                      >
                        <i className="now-ui-icons ui-2_settings-90"></i>
                      </Button>{` `}
                      <Button
                        onClick={() => this.deleteMatriculaFromDb(matricula._id)}
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

export default Matriculas;
