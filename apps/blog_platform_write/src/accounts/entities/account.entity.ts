import { BaseEntity } from "../../../../../libs/entity/base.entity";
import { Column, Entity } from "typeorm";


@Entity()
export class Account extends BaseEntity {

    @Column()
    email: string

    @Column()
    login: string

    @Column()
    passwordHash: string

    @Column()
    passwordSalt: string
}