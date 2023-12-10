import http from "node:http";
import { createRouteHandler, loadRoutes } from "./routes/index.js";

const PORT = process.env.PORT || 3333;

async function startServer() {
  try {
    const routes = await loadRoutes("./routes");
    const routeHandler = createRouteHandler(routes);

    const server = http.createServer(routeHandler);

    server.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
}

startServer();
