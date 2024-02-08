import { DataSource, EntityManager, FileLogger } from "typeorm";
import { CreateAccountCommand } from "./command/create_account.command";
import { AccountsService } from "../../application/accounts.service";
import { Account } from "../../entities/account.entity";
import { Injectable } from "@nestjs/common";
import { TransactionDecorator } from "../../../../../../libs/decorators/transaction.decorator";
import { OutboxService } from "../../../outbox/outbox.service";
import { Outbox } from "../../../outbox/outbox.entity";
import amqp, { Options } from "amqp-connection-manager";
import { AmqpConnection } from "@golevelup/nestjs-rabbitmq";
import { RabbitProducer } from "libs/rabbitmq/rabbitmq.module";



export interface IUseCase<I> {
    execute(command: I): void
}

@Injectable()
export class CreateAccountUseCase implements IUseCase<CreateAccountCommand> {
    constructor(
        // private dataScource: DataSource,
        // private accountService: AccountsService,
        // private outboxService: OutboxService
        private rabbitPorducer: RabbitProducer
    ) { }

    async execute(command: CreateAccountCommand) {
        // Отправлять событие в раббит с данными которые пришли
        console.log({ command })
        // console.log(this.rabbitPorducer)
        try {
            this.rabbitPorducer.sendMessage('blog_platform', '', Buffer.from(JSON.stringify(command)))
            console.log('message send to rabbitMq')
        } catch (err) {
            console.error("message can't send to rabbitMq ", err)
        }
        // const connection = amqp.connect('amqp://localhost:5672')
        // const chanel = connection.createChannel()

        // await chanel.assertExchange('hello', 'fanout')
        // // await chanel.assertQueue('hello')

        // await chanel.publish('hello', '', Buffer.from('hello'))
        // const queueName = 'hello'

        // chanel.assertQueue(queueName)

        // chanel.sendToQueue(queueName, Buffer.from('hello'))
        // console.log({ chanel })\


        // 
        // 
        // 
        // const transaction = new TransactionDecorator(this.dataScource)

        // return transaction.doOperation(
        //     command,
        //     this.doOperation.bind(this)
        // )
    }

    // async doOperation(
    //     { data }: CreateAccountCommand,
    //     manager: EntityManager
    // ) {
    //     const account = new Account()

    //     const filledAccount = await this.accountService.fillAccount(account, data, manager)

    //     const event = new Outbox()
    //     event.type = "CREATED_ACCOUNT"
    //     event.payload = JSON.stringify(filledAccount)

    //     await this.outboxService.sendOuboxEvent(event)
    //     console.log({ filledAccount })
    //     return filledAccount
    // }

}

