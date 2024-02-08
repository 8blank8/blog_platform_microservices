import { Injectable } from "@nestjs/common";
import { Outbox } from "./outbox.entity";
import { randomUUID } from "crypto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OutboxService {
    constructor(@InjectRepository(Outbox) private outboxRepo: Repository<Outbox>) { }

    async sendOuboxEvent(event: Outbox) {
        event.id = randomUUID()
        event.createdAt = new Date()
        event.updatedAt = new Date()
        event.status = 'PENDING'
        return this.outboxRepo.save(event)
    }

    async getPengingOutboxEvents() {
        try {
            // console.log(this.outboxRepo.metadata)

            const events = await this.outboxRepo.find({
                where: { status: 'PENDING' },
                order: { createdAt: 'ASC' }
            })
            return events

        } catch (err) {
            console.error(err)
            console.log('----------------------')
        }
    }

    async updateOutboxEvent(event: Outbox) {
        return this.outboxRepo.update(
            { id: event.id },
            { status: 'ACTIVE' })
    }
}