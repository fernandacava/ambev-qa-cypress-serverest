const { buildUser } = require('../../support/factories/userFactory');
const usersService = require('../../support/api/usersService');

describe('API ServeRest - usuários e autenticação', () => {
  let user;
  let userId;

  beforeEach(() => {
    user = buildUser();
    userId = undefined;
  });

  afterEach(() => {
    cy.deleteUserSafely(userId);
  });

  it('API-01 - deve cadastrar um usuário e persistir os dados', () => {
    usersService.createUser(user).then((createResponse) => {
      expect(createResponse.status).to.eq(201);
      expect(createResponse.body.message).to.eq('Cadastro realizado com sucesso');
      expect(createResponse.body._id).to.be.a('string').and.not.be.empty;
      userId = createResponse.body._id;

      usersService.getUserById(userId).then((getResponse) => {
        expect(getResponse.status).to.eq(200);
        expect(getResponse.body).to.deep.include(user);
        expect(getResponse.body._id).to.eq(userId);
      });
    });
  });

  it('API-02 - deve autenticar um usuário válido e retornar token Bearer', () => {
    usersService.createUser(user).then((createResponse) => {
      userId = createResponse.body._id;

      usersService.login(user.email, user.password).then((loginResponse) => {
        expect(loginResponse.status).to.eq(200);
        expect(loginResponse.body.message).to.eq('Login realizado com sucesso');
        expect(loginResponse.body.authorization).to.match(/^Bearer\s[\w.-]+$/);
      });
    });
  });

  it('API-03 - deve alterar, excluir e confirmar a remoção do usuário', () => {
    usersService.createUser(user).then((createResponse) => {
      userId = createResponse.body._id;
      const updatedUser = { ...user, nome: `${user.nome} Atualizado` };

      usersService.updateUser(userId, updatedUser).then((updateResponse) => {
        expect(updateResponse.status).to.eq(200);
        expect(updateResponse.body.message).to.eq('Registro alterado com sucesso');
      });

      usersService.getUserById(userId).then((getResponse) => {
        expect(getResponse.body.nome).to.eq(updatedUser.nome);
        expect(getResponse.body.email).to.eq(updatedUser.email);
      });

      usersService.deleteUser(userId).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);
        expect(deleteResponse.body.message).to.eq('Registro excluído com sucesso');
        userId = undefined;
      });

      usersService
        .getUserById(createResponse.body._id, { failOnStatusCode: false })
        .then((notFoundResponse) => {
          expect(notFoundResponse.status).to.eq(400);
          expect(notFoundResponse.body.message).to.eq('Usuário não encontrado');
        });
    });
  });
});
