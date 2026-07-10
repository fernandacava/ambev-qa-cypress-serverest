# Desafio QA Ambev - Cypress + ServeRest

![Cypress Tests](https://github.com/fernandacava/ambev-qa-cypress-serverest/actions/workflows/cypress.yml/badge.svg)

Projeto desenvolvido para o desafio técnico de QA: **3 cenários E2E de frontend** e **3 cenários de API**, utilizando **Cypress com JavaScript** e `cy.request()`.

## Aplicações testadas

- Frontend: `https://front.serverest.dev/`
- API/Swagger: `https://serverest.dev/`

## Stack

- Node.js 20+
- JavaScript
- Cypress
- Mochawesome
- ESLint
- Prettier
- GitHub Actions

## Cenários automatizados

### Frontend

1. Cadastro de cliente com dados dinâmicos, validação do retorno da API, URL, home e token.
2. Login com credenciais inválidas, validação da mensagem e ausência de token.
3. Login de administrador criado via API, validação da área administrativa e logout.

### API

1. Cadastro de usuário e confirmação de persistência por consulta.
2. Login válido e validação do token Bearer.
3. Alteração, consulta, exclusão e confirmação de remoção do usuário.

Detalhes: [`docs/PLANO_DE_TESTES.md`](docs/PLANO_DE_TESTES.md).

## Estrutura

```text
.
├── .github/workflows/cypress.yml
├── cypress
│   ├── e2e
│   │   ├── api/users-api.cy.js
│   │   └── frontend/auth-frontend.cy.js
│   ├── fixtures
│   └── support
│       ├── api/usersService.js
│       ├── factories/userFactory.js
│       ├── pages
│       ├── commands.js
│       └── e2e.js
├── docs/PLANO_DE_TESTES.md
├── cypress.config.js
├── eslint.config.js
└── package.json
```

## Pré-requisitos

No Windows/PowerShell:

```powershell
node --version
npm --version
```

Recomendado: Node.js 20 LTS ou superior.

## Instalação

```powershell
git clone https://github.com/fernandacava/ambev-qa-cypress-serverest.git
cd ambev-qa-cypress-serverest
npm ci
```

## Execução

Todos os testes:

```powershell
npm run test:all
```

Somente API:

```powershell
npm run test:api
```

Somente frontend:

```powershell
npm run test:frontend
```

Modo interativo:

```powershell
npm run cy:open
```

Lint e formatação:

```powershell
npm run lint
npm run format:check
```

Relatório Mochawesome:

```powershell
npm run test:report
start cypress\reports\html\report.html
```

## Massa de dados e independência

- Cada teste gera usuários únicos por timestamp e valor aleatório.
- Pré-condições de frontend são preparadas pela API quando adequado.
- Os usuários criados são removidos ao final dos testes.
- Não há dependência entre cenários nem necessidade de credenciais fixas.
- Em caso de interrupção brusca da execução, algum registro dinâmico pode permanecer no ambiente público do ServeRest.

## Evidências

Em execução local, falhas geram screenshots e vídeos. O pipeline do GitHub Actions publica relatórios, screenshots e vídeos como artefatos.

## CI

O workflow executa:

1. checkout;
2. instalação de dependências;
3. ESLint;
4. todos os testes no Chrome headless;
5. geração e upload das evidências.

## Sugestão de commits incrementais

```text
chore: inicializa projeto Cypress e configura qualidade de código
feat(api): adiciona services, factory e cenários de usuários
feat(web): adiciona page objects e cenários de autenticação
ci: configura pipeline Cypress e publicação de evidências
docs: adiciona README e plano de testes
```

## Autora

Fernanda Rodrigues - QA Sênior
