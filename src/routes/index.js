import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

export async function loadRoutes() {
  let allRoutes = {};
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const routesDirectory = path.join(__dirname, "..", "routes");

  try {
    const files = await fs.readdir(routesDirectory);
    for (const file of files) {
      if (file.endsWith(".js") && file !== "index.js") {
        const modulePath = path.join(routesDirectory, file);
        const module = await import(modulePath);
        Object.assign(allRoutes, module.default);
        console.log(`Route ${file.replace(".js", "")} load`);
      }
    }
  } catch (error) {
    console.error("Erro ao carregar rotas:", error);
  }

  return allRoutes;
}

export function createRouteHandler(routes) {
  return (request, response) => {
    extendResponse(response);
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathSegments = url.pathname.split("/").filter(Boolean);

    // Inicializando o objeto params no request
    request.params = {};

    let routeKey = `/${pathSegments[0]}`;
    let paramIndex = 1;

    for (let i = 1; i < pathSegments.length; i++) {
      // Se for um número, considera como parâmetro dinâmico
      if (!isNaN(pathSegments[i])) {
        request.params[`param${paramIndex}`] = pathSegments[i];
        routeKey += "/:param";
        paramIndex++;
      } else {
        // Inclui segmentos fixos da rota como estão
        routeKey += `/${pathSegments[i]}`;
      }
    }

    const handler = routes[`${request.method}:${routeKey}`];

    if (handler) {
      handler(request, response);
    } else {
      response.writeHead(404);
      response.end("Not Found");
    }
  };
}

export function extendResponse(response) {
  response.json = (data, statusCode = 200) => {
    response.writeHead(statusCode, { "Content-Type": "application/json" });
    response.end(JSON.stringify(data));
  };
}
