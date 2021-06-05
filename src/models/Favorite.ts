import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import Job from "./Job";
import User from "./User";

@Entity('favorites')
export default class Favorite {
    @PrimaryGeneratedColumn("uuid")
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({ name: "user_id" })
    user_id: User;

    @OneToOne(type => Job)
    @JoinColumn({ name: "job_id" })
    job_id: Job;
}