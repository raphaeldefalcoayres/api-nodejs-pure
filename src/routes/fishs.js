import {
  createFish,
  readFish,
  showFish,
  updateFish,
  deleteFish
} from "../controllers/fish.js";

const routes = {
  "POST:/fishs": createFish,
  "GET:/fishs": readFish,
  "GET:/fishs/:id": showFish,
  "PUT:/fishs/:id": updateFish,
  "DELETE:/fishs/:id": deleteFish,
};

export default routes;