import fs from "fs";
import inquirer from "inquirer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Função para criar arquivos
const createFile = (filePath, content) => {
  fs.writeFileSync(filePath, content, { encoding: "utf-8" });
};

const removeModule = (moduleName) => {
  try {
    fs.unlinkSync(
      path.join(__dirname, `controllers/${moduleName.toLowerCase()}s.js`)
    );
    fs.unlinkSync(
      path.join(__dirname, `routes/${moduleName.toLowerCase()}s.js`)
    );
    console.log("Módulo removido com sucesso!");
    mainMenu();
  } catch (error) {
    console.error("Erro ao remover módulo:", error);
    mainMenu();
  }
};

const mainMenu = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "O que você gostaria de fazer?",
        choices: ["Criar Módulo", "Remover Módulo", "Sair"],
      },
    ])
    .then((answers) => {
      if (answers.action === "Criar Módulo") {
        createModule();
      } else if (answers.action === "Remover Módulo") {
        removeModulePrompt();
      } else {
        console.log("Saindo...");
        process.exit(); // Encerra o programa
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
      mainMenu();
    });
};

// Função para gerar o template do controller
const controllerTemplate = (moduleName, operations) => {
  let content = "";
  operations.forEach((op) => {
    content += `
export function ${op.toLowerCase()}${moduleName}(request, response) {
  // Implementação da lógica para ${op.toLowerCase()} ${moduleName.toLowerCase()}
  response.json({ message: "${moduleName} ${op.toLowerCase()} com sucesso" });
}\n`;
  });
  return content.trim();
};

// Função para gerar o template das rotas
const routesTemplate = (moduleName, operations) => {
  const routes = {
    create: `  "POST:/${moduleName.toLowerCase()}s": create${moduleName},`,
    read: `  "GET:/${moduleName.toLowerCase()}s": read${moduleName},`,
    show: `  "GET:/${moduleName.toLowerCase()}s/:id": show${moduleName},`,
    update: `  "PUT:/${moduleName.toLowerCase()}s/:id": update${moduleName},`,
    delete: `  "DELETE:/${moduleName.toLowerCase()}s/:id": delete${moduleName},`,
  };

  let content = `
import {
  ${operations.map((op) => `${op.toLowerCase()}${moduleName}`).join(",\n  ")}
} from "../controllers/${moduleName.toLowerCase()}.js";

const routes = {\n`;
  operations.forEach((op) => {
    content += routes[op.toLowerCase()] + "\n";
  });
  content += `};

export default routes;`;
  return content.trim();
};

const removeModulePrompt = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "moduleName",
        message:
          "Qual o nome do módulo que deseja remover? (em singular, com a primeira letra maiúscula)",
      },
      {
        type: "confirm",
        name: "confirmRemove",
        message: "Tem certeza de que deseja remover este módulo?",
        default: false,
      },
    ])
    .then((answers) => {
      if (answers.confirmRemove) {
        removeModule(answers.moduleName);
      } else {
        console.log("Remoção cancelada.");
        mainMenu();
      }
    })
    .catch((error) => {
      console.error("Erro ao remover módulo:", error);
      mainMenu();
    });
};

mainMenu();

const createModule = () => {
  // Perguntas para o usuário
  inquirer
    .prompt([
      {
        type: "input",
        name: "moduleName",
        message:
          "Qual o nome do módulo (em singular, com a primeira letra maiúscula)?",
      },
      {
        type: "confirm",
        name: "isRest",
        message: "É um módulo REST?",
        default: false,
      },
      {
        type: "checkbox",
        name: "operations",
        message: "Selecione as operações CRUD que você deseja incluir:",
        choices: ["Create", "Read", "Show", "Update", "Delete"],
        default: ["Create", "Read", "Show", "Update", "Delete"],
        when: (answers) => answers.isRest, // Só exibe esta pergunta se for um módulo REST
      },
    ])
    .then((answers) => {
      const { moduleName, isRest, operations } = answers;
      if (isRest) {
        const moduleNameCapitalized =
          moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
        createFile(
          `src/controllers/${moduleName.toLowerCase()}s.js`,
          controllerTemplate(moduleNameCapitalized, operations)
        );
        createFile(
          `src/routes/${moduleName.toLowerCase()}s.js`,
          routesTemplate(moduleNameCapitalized, operations)
        );
        console.log("Módulo REST criado com sucesso!");
        mainMenu();
      } else {
        // Outras ações para módulos não REST
        console.log("Módulo não REST criado!");
        mainMenu();
      }
    })
    .catch((error) => {
      console.error("Erro ao criar módulo:", error);
      mainMenu();
    });
};
