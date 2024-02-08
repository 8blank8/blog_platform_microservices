import { Global, Module } from "@nestjs/common";
import { OutboxProccesor } from "./outbox.proccesor";
import { OutboxService } from "./outbox.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Outbox } from "./outbox.entity";
// import { RabbitMqModule } from "../../../../libs/rabbitmq/rabbitmq.module";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Outbox]),
        // RabbitMqModule
    ],
    providers: [
        OutboxProccesor,
        OutboxService,
    ],
    exports: [
        OutboxService,
        OutboxProccesor,
        // RabbitMqProducer
    ]
})
export class OutboxModule { }