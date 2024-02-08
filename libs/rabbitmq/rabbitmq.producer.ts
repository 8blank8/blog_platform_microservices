import * as dotenv from 'dotenv'
dotenv.config()
import { Injectable } from "@nestjs/common";
import * as amqplib from 'amqplib'

class RabbitContentDto {
    type: string
    payload: any
}

interface IRabbitProducer {
    sendEvent(content: RabbitContentDto): void
}

@Injectable()
export class RabbitMqProducer implements IRabbitProducer {
    async sendEvent(content: RabbitContentDto) {
        try {
            const connection = await amqplib.connect('amqp://localhost:5672')
            console.log('connection rabiit ok')

            const channel = await connection.createChannel()
            console.log('create chanel ok')

            const exchangeName = 'blog_platform'

            await channel.assertExchange(exchangeName, "fanout", { durable: false })

            channel.sendToQueue('blog_platfrom_read_api', Buffer.from(JSON.stringify(content)))
            // channel.publish(exchangeName, '', Buffer.from(JSON.stringify(content)))
        } catch (err) {
            console.log('Error conection RabbitMQ')
            throw new Error(err)
        }
    }
}