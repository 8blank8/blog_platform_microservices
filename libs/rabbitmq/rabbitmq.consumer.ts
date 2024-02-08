import { Injectable, Module, OnModuleInit } from "@nestjs/common";
import * as amqplib from 'amqplib'

interface IRabbitConsumer {
    getEvent(queueName: string): void
}

@Injectable()
export class RabbitMQConsumer implements IRabbitConsumer {
    async getEvent(queueName: string) {
        try {

            const connection = await amqplib.connect('amqp://localhost:5672')
            const chanel = await connection.createChannel()

            // const queueName = 'blog_platfrom_read_api'
            const exchangeName = 'blog_platform'

            await chanel.assertExchange(exchangeName, 'fanout', { durable: false })
            await chanel.assertQueue(queueName)

            await chanel.bindQueue(queueName, exchangeName, '')

            const msg = await chanel.consume(queueName, (msg) => {
                const content = JSON.parse(msg?.content.toString())
                chanel.ack(msg)

                return content
            })

            return msg

        } catch (err) {
            console.log('Connection consumer RabbitMq Error', err)
        }
    }

}