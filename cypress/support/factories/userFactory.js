const uniqueId = () => `${Date.now()}-${Cypress._.random(100000, 999999)}`;

const buildUser = (overrides = {}) => ({
  nome: `QA Ambev ${uniqueId()}`,
  email: `qa.ambev.${uniqueId()}@example.com`,
  password: `Qa@${Cypress._.random(100000, 999999)}`,
  administrador: 'false',
  ...overrides
});

module.exports = { buildUser };
