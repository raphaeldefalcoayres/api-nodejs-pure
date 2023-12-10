import {
  createProject,
  deleteProject,
  listProject,
  readProject,
  updateProject,
} from "../controllers/project.js";

const routes = {
  "GET:/projects": listProject,
  "GET:/projects/:id": readProject,
  "POST:/projects": createProject,
  "PUT:/projects/:id": updateProject,
  "DELETE:/projects/:id": deleteProject,
};

export default routes;