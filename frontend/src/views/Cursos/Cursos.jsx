import React from "react";
import axios from "axios";
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


class Cursos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      titulo: "",
      descricao: "",
      intervalIsSet: false,
      cursos: []
    };
  }

  componentDidMount() {
    this.getCursoFromDb();
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getCursoFromDb(), 20000);
      this.setState({ intervalIsSet: interval });
    }
  }

  editarCurso = (e, id, key) => {
    const valor = e.target.value;
    this.setState(prevState => ({
      cursos: prevState.cursos.map(curso => (
        curso._id === id ? {...curso, [key]: valor} : curso)
        )
    }))
  }

  getCursoFromDb = () => {
    fetch("/api/cursos")
      .then(data => data.json())
      .then(res => this.setState({ cursos: res.data }));
  };

  createCurso = () => {
    axios.post("/api/curso", {
      titulo: this.state.titulo,
      descricao: this.state.descricao
    }).then(() => this.getCursoFromDb());
  };

  deleteCursoFromDb = id => {
    axios.delete(`/api/curso/${id}`, {
      data: {
        _id: id
      }
    }).then(() => this.getCursoFromDb())
  }

  updateCursoFromDb = id => {
    const updatedCurso = this.state.cursos.find(curso => curso._id === id);
    axios.post(`/api/updateCurso/${id}`, {
      id,
      update: {
        titulo: updatedCurso.titulo,
        descricao: updatedCurso.descricao
      }
    }).then(() => this.getCursoFromDb());
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
          Adicionar Curso
        </h3>
        <div>
          <Form>
            <FormGroup>
              <Label for="exampleTitulo">Titulo</Label>
              <Input
                value={this.state.titulo}
                onChange={e => this.setState({ titulo: e.target.value })}
                type="text-field"
                name="titulo"
                id="exampleTitulo"
                placeholder="titulo"
              />
            </FormGroup>
            <FormGroup>
              <Label for="descricaoField">Descrição</Label>
              <Input
                type="text-field"
                name="descricao"
                onChange={e => this.setState({ descricao: e.target.value })}
                value={this.state.descricao}
                id="descricaoField"
                placeholder="Descrição"
              />
            </FormGroup>
            <Row>
              <Col xs={10} />
              <Col xs={2}>
                <Button color="success" onClick={this.createCurso}>Create +</Button>
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
                  <th>Titulo</th>
                  <th>Descricao</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.state.cursos.map((curso, index) => (
                  <tr key={curso._id}>
                    <td className="text-center">
                      {index + 1}
                    </td>
                    <td>
                    <Input
                      value={curso.titulo}
                      onChange={e => this.editarCurso(e, curso._id, "titulo")}
                      type="text-field"
                      name="titulo"
                      placeholder="Titulo"
                    />
                    </td>
                    <td>
                      <Input
                        value={curso.descricao}
                        onChange={e => this.editarCurso(e, curso._id, "descricao")}
                        type="text-field"
                        name="descricao"
                        placeholder="Descricao"
                      />
                    </td>
                    <td />
                    <td className="text-right">
                      <Button
                        icon
                        color="success"
                        size="sm"
                        onClick={() => this.updateCursoFromDb(curso._id)}
                      >
                        <i className="now-ui-icons ui-2_settings-90"></i>
                      </Button>{` `}
                      <Button
                        onClick={() => this.deleteCursoFromDb(curso._id)}
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

export default Cursos;
