import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { postgresPrimaryDBConfig } from "./postgres_primary_db.config";
import { postgresSecondaryDBConfig } from "./postgres_secondary_db.config";

@Module({
    imports: [
        TypeOrmModule.forRoot(postgresPrimaryDBConfig),
    ]
})
export class PostgresModule { }