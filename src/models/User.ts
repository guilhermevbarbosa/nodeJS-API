import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  tel: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  work_area: string;

  @Column()
  cep: string;

  @Column()
  address: string;

  @Column()
  state: string;

  @Column()
  password: string;

  @Column()
  account_type: number;
}
