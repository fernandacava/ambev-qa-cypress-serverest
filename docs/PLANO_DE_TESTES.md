# Plano de Testes

## Objetivo

Validar fluxos críticos de cadastro e autenticação no frontend e os contratos de usuários/autenticação da API ServeRest.

## Cenários frontend

| ID     | Cenário                                 | Resultado esperado                                                                   |
| ------ | --------------------------------------- | ------------------------------------------------------------------------------------ |
| WEB-01 | Cadastro de cliente com dados dinâmicos | HTTP 201, redirecionamento para `/home`, home visível e token persistido             |
| WEB-02 | Login inválido                          | Mensagem de credenciais inválidas, permanência no login e ausência de token          |
| WEB-03 | Login e logout de administrador         | HTTP 200, acesso a `/admin/home`, menus administrativos e remoção do token no logout |

## Cenários API

| ID     | Cenário                   | Resultado esperado                                                       |
| ------ | ------------------------- | ------------------------------------------------------------------------ |
| API-01 | Criar e consultar usuário | HTTP 201, ID gerado e dados persistidos via GET                          |
| API-02 | Autenticar usuário válido | HTTP 200, mensagem de sucesso e token no padrão Bearer                   |
| API-03 | Alterar e excluir usuário | Alteração persistida, exclusão confirmada e GET posterior retornando 400 |

## Estratégia de estabilidade

- Dados únicos por execução usando timestamp e número aleatório.
- Preparação de pré-condições pela API.
- Limpeza dos usuários criados em `afterEach`.
- Testes independentes e executáveis em qualquer ordem.
- Seletores `data-testid` no frontend.
- Retentativas somente no modo headless para reduzir flutuações externas.
