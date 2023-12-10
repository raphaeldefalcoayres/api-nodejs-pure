// tasks.js
export function listTask(request, response) {
  // Implementação da lógica para criar task
  response.json({ message: "Lista de tasks" });
}

export function createTask(request, response) {
  // Implementação da lógica para criar task
  response.json({ message: "Task criada com sucesso" });
}

export function readTask(request, response) {
  // Implementação da lógica para ler task
  console.log(request.params);
  response.json({ message: "Informações da task" });
}

export function updateTask(request, response) {
  // Implementação da lógica para atualizar task
  console.log("request", request.params);
  response.json({ message: "Task atualizada com sucesso" });
}

export function deleteTask(request, response) {
  // Implementação da lógica para deletar task
  console.log(request.params);
  response.json({ message: "Task deletada com sucesso" });
}
