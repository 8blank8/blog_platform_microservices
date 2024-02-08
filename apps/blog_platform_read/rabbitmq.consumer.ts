import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitConsumer {
    @RabbitSubscribe({
        exchange: 'blog_platform',
        routingKey: '',
        queue: 'blog_platform_read_api',
    })
    public async pubSubHandler(msg: {}) {
        console.log(`Received message read: ${JSON.stringify(msg)}`);
    }
}