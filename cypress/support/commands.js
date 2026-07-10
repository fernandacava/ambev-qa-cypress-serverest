const usersService = require('./api/usersService');

Cypress.Commands.add('deleteUserSafely', (userId) => {
  if (!userId) return;

  usersService.deleteUser(userId).then((response) => {
    expect([200, 400]).to.include(response.status);
  });
});
