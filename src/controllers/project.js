export function listProject(request, response) {
  // Implementação da lógica para listar projects
  response.json({ message: "Lista de projects" });
}

export function createProject(request, response) {
  // Implementação da lógica para criar project
  response.json({ message: "Project criado com sucesso" });
}

export function readProject(request, response) {
  // Implementação da lógica para ler project
  response.json({ message: "Informações do project" });
}

export function updateProject(request, response) {
  // Implementação da lógica para atualizar project
  response.json({ message: "Project atualizado com sucesso" });
}

export function deleteProject(request, response) {
  // Implementação da lógica para deletar project
  response.json({ message: "Project deletado com sucesso" });
}