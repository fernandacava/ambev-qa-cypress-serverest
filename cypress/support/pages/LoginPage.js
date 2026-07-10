class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillEmail(email) {
    cy.get('[data-testid="email"]').clear().type(email);
  }

  fillPassword(password) {
    cy.get('[data-testid="senha"]').clear().type(password, { log: false });
  }

  submit() {
    cy.get('[data-testid="entrar"]').click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }
}

module.exports = new LoginPage();
