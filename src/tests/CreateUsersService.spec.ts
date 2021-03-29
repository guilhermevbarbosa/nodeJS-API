import UserCreate from "../src/models/request/UserCreate";
import CreateUsersService from "../src/services/User/CreateUsersService";

describe("testing users service", () => {
  let createUsersService: CreateUsersService;

  beforeEach(() => {
    createUsersService = new CreateUsersService();
  });

  test("create user", async () => {
    let user: UserCreate = {
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
    };

    expect(await createUsersService.create(user)).toContain("id");
  });
});
