class RegisterPage {
  visit() {
    cy.visit('/cadastrarusuarios');
  }

  register(user) {
    cy.get('[data-testid="nome"]').type(user.nome);
    cy.get('[data-testid="email"]').type(user.email);
    cy.get('[data-testid="password"]').type(user.password, { log: false });

    if (user.administrador === 'true') {
      cy.get('[data-testid="checkbox"]').check();
    }

    cy.get('[data-testid="cadastrar"]').click();
  }
}

module.exports = new RegisterPage();
