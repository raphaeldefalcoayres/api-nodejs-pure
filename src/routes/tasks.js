import {
  createTask,
  deleteTask,
  readTask,
  updateTask,
} from "../controllers/tasks.js";

const routes = {
  "GET:/tasks/:param": readTask,
  "POST:/tasks": createTask,
  "PUT:/tasks/:param": updateTask,
  "DELETE:/tasks/:param": deleteTask,
};

export default routes;
