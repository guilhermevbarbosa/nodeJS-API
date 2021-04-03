import FakeUsersRepository from "../modules/users/fakes/FakeUsersRepository";

import CreateUsersService from "../services/User/CreateUsersService";

describe("testing users service", () => {
  let fakeUsersRepository: FakeUsersRepository;
  let createUser: CreateUsersService;

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUsersService(fakeUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = await createUser.create({
      name: "Teste",
      email: "g2@g.com",
      tel: "5511-7170",
      cpf_cnpj: "513.128.158-09",
      work_area: "TI",
      cep: "05763-290",
      address: "Rua teste",
      state: "SP",
      city: "São Paulo",
      password: "123456g",
      account_type: 0,
    });

    expect(user).toMatch("Criado com sucesso!");
  });
});
