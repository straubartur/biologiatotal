import Alunos from "views/Alunos/Alunos.jsx";
import Matriculas from "views/Matriculas/Matriculas.jsx";
import Cursos from "views/Cursos/Cursos.jsx";

var dashRoutes = [
  {
    path: "/alunos",
    name: "Alunos",
    icon: "ui-1_bell-53",
    component: Alunos
  },
  {
    path: "/cursos",
    name: "Cursos",
    icon: "users_single-02",
    component: Cursos
  },
  {
    path: "/matriculas",
    name: "Matriculas",
    icon: "files_paper",
    component: Matriculas
  },
  { redirect: true, path: "/", pathTo: "/matriculas", name: "Dashboard" }
];
export default dashRoutes;
