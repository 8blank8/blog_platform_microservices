import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from '../accounts.controller';
import { AccountsService } from '../../application/accounts.service';
import { CreateAccountDto } from '../../dto/create_account.sto';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateAccountUseCase } from '../../use_cases/create/create_account.use-case';
import { DataSource } from 'typeorm';
import { AccountsModule } from '../../accounts.module';

describe('AccountsController', () => {
  let controller: AccountsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountsModule],
      // controllers: [AccountsController],
      // providers: [AccountsService, CreateAccountUseCase],
    }).compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create account, should be status 201', async () => {
    const data: CreateAccountDto = {
      email: 'asd',
      login: 'asd',
      password: 'asd'
    }

    const res = await controller.createAccount(data)
    console.log(res)

    // expect(res.login).toBe('asd')
  })
});
