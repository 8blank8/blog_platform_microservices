import { BaseEntity } from "../../../../libs/entity/base.entity";
import { Column, Entity, EntityRepository, Repository } from "typeorm";

@Entity()
export class Outbox extends BaseEntity {
    @Column()
    payload: string

    @Column()
    status: 'PENDING' | 'ACTIVE'

    @Column()
    type: string
}
