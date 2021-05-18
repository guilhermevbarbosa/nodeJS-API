import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "./User";

@Entity('services')
export default class Job {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @OneToOne(type => User)
    @JoinColumn({ name: "user_id" })
    user_id: User;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    category: string;

    @Column()
    aprox_val: string;
}