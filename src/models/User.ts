import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  tel: string;

  @Column({ unique: true })
  cpf_cnpj: string;

  @Column({ default: null, nullable: true })
  work_area: string;

  @Column()
  cep: string;

  @Column()
  address: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  password: string;

  @Column()
  account_type: number;
}
