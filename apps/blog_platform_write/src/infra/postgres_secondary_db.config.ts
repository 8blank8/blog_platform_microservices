import { config } from 'dotenv'
config()

import { Outbox } from '../outbox/outbox.entity';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const allEntities = [
    Outbox
]

export const postgresSecondaryDBConfig: PostgresConnectionOptions = {
    name: 'secondary',
    type: 'postgres',
    host: process.env.SECONDARY_DB_HOST,
    port: +process.env.SECONDARY_DB_PORT,
    username: process.env.SECONDARY_DB_USER,
    password: process.env.SECONDARY_DB_PASSWORD,
    database: process.env.SECONDARY_DB_NAME,
    entities: allEntities,
    synchronize: true,
    migrations: [__dirname + '/postgres/secondary/migrations/**/*{.ts,.js}'],
}

export default new DataSource(postgresSecondaryDBConfig)