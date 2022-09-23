import {MigrationInterface, QueryRunner} from "typeorm";

export class AssignerAdded1659877137066 implements MigrationInterface {
    name = 'AssignerAdded1659877137066'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" ADD "assignerId" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job" DROP COLUMN "assignerId"`);
    }

}
