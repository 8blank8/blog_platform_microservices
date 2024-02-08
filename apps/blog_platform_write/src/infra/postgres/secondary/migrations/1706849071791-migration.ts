import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706849071791 implements MigrationInterface {
    name = 'Migration1706849071791'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "outbox" ("id" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "payload" character varying NOT NULL, "status" character varying NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_340ab539f309f03bdaa14aa7649" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "outbox"`);
    }

}
