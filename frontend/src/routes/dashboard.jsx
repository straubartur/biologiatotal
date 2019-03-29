import Dashboard from "views/Dashboard/Dashboard.jsx";
import Alunos from "views/Alunos/Alunos.jsx";
import TableList from "views/TableList/TableList.jsx";
import Cursos from "views/Cursos/Cursos.jsx";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "design_app",
    component: Dashboard
  },
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
    component: TableList
  },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
