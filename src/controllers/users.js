// users.js
export function listUser(request, response) {
  // Implementação da lógica para criar usuário
  response.json({ message: "Lista de usuários" });
}

export function createUser(request, response) {
  // Implementação da lógica para criar usuário
  response.json({ message: "Usuário criado com sucesso" });
}

export function readUser(request, response) {
  // Implementação da lógica para ler usuário
  console.log(request.params);
  response.json({ message: "Informações do usuário" });
}

export function updateUser(request, response) {
  // Implementação da lógica para atualizar usuário
  console.log("request", request.params);
  response.json({ message: "Usuário atualizado com sucesso" });
}

export function deleteUser(request, response) {
  // Implementação da lógica para deletar usuário
  response.json({ message: "Usuário deletado com sucesso" });
}
