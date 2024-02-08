import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CreateAccountCommand } from '../use_cases/create/command/create_account.command';
import { CreateAccountUseCase } from '../use_cases/create/create_account.use-case';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Repository } from 'typeorm';

@Controller('accounts')
export class AccountsController {
  constructor(
    private createAccountUseCasse: CreateAccountUseCase,
    @InjectRepository(Account) private accountRepo: Repository<Account>
  ) { }

  @Get('')
  async getMe() {
    return this.accountRepo.find()
  }

  @Post('')
  async createAccount(
    @Body() data: { login: string, email: string, password: string }) {
    const command: CreateAccountCommand = {
      data
    }
    return this.createAccountUseCasse.execute(command)
  }

  @Delete('')
  async deleteAllAccounts() {
    return this.accountRepo.delete({})
  }

}
