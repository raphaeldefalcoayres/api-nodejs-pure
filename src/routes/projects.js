import {
  createProject,
  readProject,
  showProject,
  updateProject,
  deleteProject
} from "../controllers/projects.js";

const routes = {
  "POST:/projects": createProject,
  "GET:/projects": readProject,
  "GET:/projects/:id": showProject,
  "PUT:/projects/:id": updateProject,
  "DELETE:/projects/:id": deleteProject,
};

export default routes;