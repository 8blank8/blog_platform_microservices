import { config } from 'dotenv'
config()

import { Account } from '../accounts/entities/account.entity';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Outbox } from '../outbox/outbox.entity';

const allEntities = [
    Account,
    Outbox
]

export const postgresPrimaryDBConfig: PostgresConnectionOptions = {
    // name: "default",
    type: 'postgres',
    host: process.env.PRIMARY_DB_HOST,
    port: +process.env.PRIMARY_DB_PORT,
    username: process.env.PRIMARY_DB_USER,
    password: process.env.PRIMARY_DB_PASSWORD,
    database: process.env.PRIMARY_DB_NAME,
    entities: allEntities,
    synchronize: true,
    migrations: [__dirname + '/postgres/primary/migrations/**/*{.ts,.js}'],
}

export default new DataSource(postgresPrimaryDBConfig)