const apiUrl = () => Cypress.env('apiUrl');

const createUser = (user, options = {}) =>
  cy.request({
    method: 'POST',
    url: `${apiUrl()}/usuarios`,
    body: user,
    failOnStatusCode: options.failOnStatusCode ?? true
  });

const getUserById = (userId, options = {}) =>
  cy.request({
    method: 'GET',
    url: `${apiUrl()}/usuarios/${userId}`,
    failOnStatusCode: options.failOnStatusCode ?? true
  });

const updateUser = (userId, user, options = {}) =>
  cy.request({
    method: 'PUT',
    url: `${apiUrl()}/usuarios/${userId}`,
    body: user,
    failOnStatusCode: options.failOnStatusCode ?? true
  });

const deleteUser = (userId, options = {}) =>
  cy.request({
    method: 'DELETE',
    url: `${apiUrl()}/usuarios/${userId}`,
    failOnStatusCode: options.failOnStatusCode ?? false
  });

const login = (email, password, options = {}) =>
  cy.request({
    method: 'POST',
    url: `${apiUrl()}/login`,
    body: { email, password },
    failOnStatusCode: options.failOnStatusCode ?? true
  });

module.exports = { createUser, getUserById, updateUser, deleteUser, login };
