import { DynamicModule, Global, Injectable, Module } from "@nestjs/common";
// import { RabbitMQConsumer } from "./rabbitmq.consumer";
// import { RabbitMqProducer } from "./rabbitmq.producer";


// @Module({
//     providers: [
//         RabbitMQConsumer,
//         RabbitMqProducer
//     ],
//     exports: [
//         RabbitMQConsumer,
//         RabbitMqProducer
//     ]
// })
// export class RabbitMqModule { }

import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Options } from "amqplib";

@Injectable()
export class RabbitProducer {
    constructor(
        private readonly amqpConnection: AmqpConnection,
    ) { }

    sendMessage(exchange: string, routingKey: string, message: any, options?: Options.Publish) {
        // console.log(this.amqpConnection)
        return this.amqpConnection.publish(exchange, routingKey, message, options)
    }
}

interface IRabbitConsumer {
    pubSubHandler(msg: {}): void
}

@Injectable()
export class MessagingService {
    @RabbitSubscribe({
        exchange: 'blog_platform',
        routingKey: '',
        queue: 'blog_platform_read_api',
    })
    public async pubSubHandler(msg: {}) {
        console.log(`Received message write: ${JSON.stringify(msg)}`);
    }
}

import { RabbitMQModule } from "@golevelup/nestjs-rabbitmq";

// @Module({
//     imports: [
//         RabbitMQModule.forRoot(RabbitMQModule, {
//             exchanges: [
//                 {
//                     name: 'blog_platform',
//                     type: 'fanout',
//                 },
//             ],
//             uri: 'amqp://guest:guest@localhost:5672',
//             connectionInitOptions: { wait: false },
//         }),
//         RabbitModule
//     ],
//     providers: [
//         RabbitProducer,
//         MessagingService
//     ],
//     exports: [
//         RabbitProducer,
//         MessagingService
//     ]
// })
// export class RabbitModule { }


type Options = {
    exchangesName: string,
    // producer?: RabbitProducer,
    // consumer?: IRabbitConsumer
}

const EXCHANGE_NAME = 'blog_platform'

@Module({})
export class RbMq {
    static forRoot(options: Options): DynamicModule {

        return {
            module: RbMq,
            imports: [
                RabbitMQModule.forRoot(RabbitMQModule, {
                    exchanges: [
                        {
                            name: options.exchangesName,
                            type: 'fanout',
                        },
                    ],
                    uri: 'amqp://guest:guest@localhost:5672',
                    connectionInitOptions: { wait: false },
                }),
                // RabbitModule
            ],
            providers: [
                RabbitProducer,
                // {
                //     provide: 'RABBIT_CONSUMER',
                //     useValue: options.consumer
                // }
            ],
            exports: [
                RabbitProducer,
                // {
                //     provide: 'RABBIT_CONSUMER',
                //     useValue: options.consumer
                // }
            ]
        }
    }
}