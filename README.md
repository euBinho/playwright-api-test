# 🎯 Playwright API Tests Dynamic

Projeto de automação de testes de API utilizando **[Playwright](https://playwright.dev/)** com **TypeScript** e **Faker** para geração dinâmica de dados.

## 🚀 Tecnologias usadas
- [Playwright Test](https://playwright.dev/docs/test-intro) → framework de automação
- [TypeScript](https://www.typescriptlang.org/) → tipagem e boas práticas
- [@faker-js/faker](https://fakerjs.dev/) → dados dinâmicos realistas
- [Node.js](https://nodejs.org/) → ambiente de execução

---

## 📂 Estrutura do projeto
```
tests/
 ├── posts.spec.ts
 ├── users.spec.ts
 ├── comments.spec.ts
 ├── albums.spec.ts
 ├── todos.spec.ts
 ├── photos.spec.ts
playwright.config.ts
tsconfig.json
```

---

## ✅ Cenários cobertos

- **Posts**: criar, listar, atualizar, deletar, erros 404  
- **Users**: criar usuário dinâmico com Faker, validar schema  
- **Comments**: buscar por post, validar integridade  
- **Albums**: listar por usuário  
- **Todos**: criar dinâmico, atualizar status, validar erros  
- **Photos**: listar fotos, buscar por ID  
- **Integração**: validar relação entre `users`, `posts` e `comments`  
- **Negativos**: endpoints inválidos, dados incorretos, recursos inexistentes  
- **Schema**: contrato dos retornos da API  

---

## 🛠 Como rodar localmente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/playwright-api-tests.git
cd playwright-api-tests
```

2. Instale as dependências:
```bash
npm install
```

3. Rode todos os testes:
```bash
npm test
```

4. Gerar relatório HTML:
```bash
npm report
```

---

## 📊 Relatórios
O Playwright gera automaticamente:
- `playwright-report/` → relatório HTML interativo
- `test-results/` → resultados brutos dos testes

---

## 🔮 Melhorias futuras
- Centralizar geração de dados Faker em `utils/generator.ts`
- Adicionar testes de performance (tempo de resposta)
- Simular cenários de autenticação com headers
- Pipeline CI/CD no GitHub Actions

---

👨‍💻 Desenvolvido por **Breno Morais**  
