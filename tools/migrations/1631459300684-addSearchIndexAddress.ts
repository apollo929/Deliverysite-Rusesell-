/* import { MigrationInterface, QueryRunner } from 'typeorm';

export class addSearchIndexAddress1631459300684 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE INDEX  index_address_trigram
ON job
USING gin (address gin_trgm_ops);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS index_address_trigram`);
  }
}
 */
