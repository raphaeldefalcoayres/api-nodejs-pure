import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Variável global para armazenar as rotas
let globalRoutes = {};

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

  // Armazena as rotas carregadas na variável global
  globalRoutes = allRoutes;

  return allRoutes;
}

export function createRouteHandler(routes) {
  return (request, response) => {
    extendResponse(response);
    const url = new URL(request.url, `http://${request.headers.host}`);
    const pathSegments = url.pathname.split("/").filter(Boolean);

    if (url.pathname === "/" && request.method === "GET") {
      initialRouteHandler(request, response);
      return;
    }

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

// Função para gerar um HTML com a lista de rotas
export function listRoutesHtml() {
  let modules = {};

  // Agrupar rotas por módulo
  Object.keys(globalRoutes).forEach((route) => {
    // Inferir o nome do módulo a partir da rota
    // Aqui você precisa ajustar a lógica conforme sua estrutura de rotas
    let moduleName = route.split("/")[1]; // Exemplo: se a rota for "GET:/products/list", moduleName será "products"

    if (!modules[moduleName]) {
      modules[moduleName] = [];
    }
    modules[moduleName].push(route);
  });

  // Gerar HTML com rotas agrupadas por módulo
  let html = "<html><body><h1>Lista de Rotas</h1>";
  for (let moduleName in modules) {
    html += `<h2>${moduleName}</h2><ul>`;
    modules[moduleName].forEach((route) => {
      html += `<li>${route}</li>`;
    });
    html += "</ul>";
  }
  html += "</body></html>";

  return html;
}

// Função adicional para lidar com a rota inicial '/'
export function initialRouteHandler(request, response) {
  const html = listRoutesHtml();
  response.writeHead(200, { "Content-Type": "text/html" });
  response.end(html);
}
