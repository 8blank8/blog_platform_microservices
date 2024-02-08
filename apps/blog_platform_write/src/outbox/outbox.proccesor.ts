import { Injectable } from "@nestjs/common";
import { OutboxService } from "./outbox.service";
import { RabbitMqProducer } from "../../../../libs/rabbitmq/rabbitmq.producer";


@Injectable()
export class OutboxProccesor {
    constructor(
        private outboxService: OutboxService,
        private rabbitMqProducer: RabbitMqProducer
    ) { }

    async sendEventToRabbitMq() {
        const events = await this.outboxService.getPengingOutboxEvents()
        console.log(events)
        for (let i = 0; i < events.length; i++) {
            const event = events[i]
            //  TODO: написать функцию отправки события в rabbit через сервис outbox
            const rabbitEvent = {
                type: event.type,
                payload: event.payload
            }

            await this.rabbitMqProducer.sendEvent(rabbitEvent)
            await this.outboxService.updateOutboxEvent(event)
        }
        setTimeout(() => {
            this.sendEventToRabbitMq()
        }, 2000);
    }
}