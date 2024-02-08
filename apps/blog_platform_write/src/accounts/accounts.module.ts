import { Module, Provider } from '@nestjs/common';
import { AccountsController } from './controllers/accounts.controller';
import { AccountsService } from './application/accounts.service';
import { CreateAccountUseCase } from './use_cases/create/create_account.use-case';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { OutboxModule } from '../outbox/outbox.module';
import { OutboxService } from '../outbox/outbox.service';
import { RabbitProducer, RbMq } from 'libs/rabbitmq/rabbitmq.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Account]),
    CqrsModule,
    RbMq.forRoot({
      exchangesName: 'blog_platform',
    })
    // OutboxModule
  ],
  controllers: [AccountsController],
  providers: [
    AccountsService,
    CreateAccountUseCase,
  ],
})
export class AccountsModule { }
