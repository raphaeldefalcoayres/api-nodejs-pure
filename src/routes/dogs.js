import {
  createDog,
  readDog,
  showDog,
  updateDog,
  deleteDog
} from "../controllers/dog.js";

const routes = {
  "POST:/dogs": createDog,
  "GET:/dogs": readDog,
  "GET:/dogs/:id": showDog,
  "PUT:/dogs/:id": updateDog,
  "DELETE:/dogs/:id": deleteDog,
};

export default routes;