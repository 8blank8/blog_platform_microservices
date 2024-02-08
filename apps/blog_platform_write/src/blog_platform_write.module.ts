import { Module } from '@nestjs/common';
import { BlogPlatformWriteController } from './blog_platform_write.controller';
import { AccountsModule } from './accounts/accounts.module';
import { PostgresModule } from './infra/postgres.module';
import { RabbitMqProducer } from 'libs/rabbitmq/rabbitmq.producer';
import { RabbitMQConsumer } from 'libs/rabbitmq/rabbitmq.consumer';
import { OutboxProccesor } from './outbox/outbox.proccesor';
import { OutboxModule } from './outbox/outbox.module';
import { RabbitModule } from 'libs/rabbitmq/rabbitmq.module';
// import { RabbitMqModule } from 'libs/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    PostgresModule,
    AccountsModule,
    // OutboxModule
  ],
  controllers: [BlogPlatformWriteController],
  providers: [
  ],
})
export class BlogPlatformWriteModule { }
