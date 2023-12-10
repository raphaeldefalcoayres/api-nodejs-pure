import {
  createUser,
  deleteUser,
  listUser,
  readUser,
  updateUser,
} from "../controllers/users.js";

const routes = {
  "GET:/users": listUser,
  "GET:/users/:id": readUser,
  "POST:/users": createUser,
  "PUT:/users/:id": updateUser,
  "DELETE:/users/:id": deleteUser,
};

export default routes;
