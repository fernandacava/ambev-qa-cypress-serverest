const { buildUser } = require('../../support/factories/userFactory');
const usersService = require('../../support/api/usersService');
const loginPage = require('../../support/pages/LoginPage');
const registerPage = require('../../support/pages/RegisterPage');

describe('Frontend ServeRest - cadastro e autenticação', () => {
  let createdUserId;

  afterEach(() => {
    cy.deleteUserSafely(createdUserId);
    createdUserId = undefined;
  });

  it('WEB-01 - deve cadastrar um cliente com dados dinâmicos e acessar a home', () => {
    const user = buildUser({ administrador: 'false' });

    cy.intercept('POST', '**/usuarios').as('createUser');
    registerPage.visit();
    registerPage.register(user);

    cy.wait('@createUser').then(({ response }) => {
      expect(response.statusCode).to.eq(201);
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      createdUserId = response.body._id;
    });

    cy.url().should('eq', `${Cypress.config('baseUrl')}/home`);
    cy.contains('h1', 'Serverest Store').should('be.visible');
    cy.window()
      .its('localStorage')
      .invoke('getItem', 'serverest/userToken')
      .should('match', /^Bearer /);
  });

  it('WEB-02 - deve exibir mensagem ao tentar login com credenciais inválidas', () => {
    loginPage.visit();
    loginPage.login(`inexistente.${Date.now()}@example.com`, 'senha-invalida');

    cy.contains('Email e/ou senha inválidos').should('be.visible');
    cy.url().should('include', '/login');
    cy.window().its('localStorage').invoke('getItem', 'serverest/userToken').should('be.null');
  });

  it('WEB-03 - deve autenticar administrador criado via API e realizar logout', () => {
    const admin = buildUser({ administrador: 'true' });

    usersService.createUser(admin).then((response) => {
      createdUserId = response.body._id;
    });

    cy.intercept('POST', '**/login').as('login');
    loginPage.visit();
    loginPage.login(admin.email, admin.password);

    cy.wait('@login').its('response.statusCode').should('eq', 200);
    cy.url().should('eq', `${Cypress.config('baseUrl')}/admin/home`);
    cy.contains('h1', 'Bem Vindo').should('be.visible');
    cy.contains('Cadastrar Produtos').should('be.visible');

    cy.get('[data-testid="logout"]').click();
    cy.url().should('include', '/login');
    cy.get('[data-testid="entrar"]').should('be.visible');
    cy.window().its('localStorage').invoke('getItem', 'serverest/userToken').should('be.null');
  });
});
