import { BadRequestException, Injectable } from '@nestjs/common';
import { Account } from '../entities/account.entity';
import { EntityManager } from 'typeorm';
import { CreateAccountDto } from '../dto/create_account.sto';
import { randomUUID } from 'crypto';
import { OutboxService } from '../../outbox/outbox.service';

@Injectable()
export class AccountsService {

    async fillAccount(
        accountEntity: Account,
        data: CreateAccountDto,
        manager: EntityManager
    ) {
        accountEntity.login = data.login
        accountEntity.email = data.email
        accountEntity.id = randomUUID()
        accountEntity.createdAt = new Date()
        accountEntity.updatedAt = new Date()
        accountEntity.passwordHash = '1'
        accountEntity.passwordSalt = '1'

        await manager.save(accountEntity)

        return accountEntity
    }
}
