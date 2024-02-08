import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class BaseEntity {
    @PrimaryColumn({ type: 'uuid', unique: true })
    id: string

    @Column({ type: 'timestamp without time zone' })
    createdAt: Date

    @Column({ type: 'timestamp without time zone' })
    updatedAt: Date
}