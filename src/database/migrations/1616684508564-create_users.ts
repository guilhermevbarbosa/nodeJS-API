import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUsers1616684508564 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "varchar",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "tel",
            type: "varchar",
          },
          {
            name: "cpf_cnpj",
            type: "varchar",
          },
          {
            name: "work_area",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "cep",
            type: "varchar",
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "state",
            type: "varchar",
          },
          {
            name: "city",
            type: "varchar",
          },
          {
            name: "password",
            type: "varchar",
          },
          {
            name: "account_type",
            type: "integer",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
