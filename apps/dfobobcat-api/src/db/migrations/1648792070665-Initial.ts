import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1648792070665 implements MigrationInterface {
    name = 'Initial1648792070665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "equipment" ("id" SERIAL NOT NULL, "name" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0722e1b9d6eb19f5874c1678740" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "name" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clock_off" ("id" SERIAL NOT NULL, "notes" text NOT NULL, "clockOffTime" TIMESTAMP WITH TIME ZONE NOT NULL, "totalTimeWorked" integer NOT NULL DEFAULT '0', "images" text array, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "jobId" integer, "staffId" integer, CONSTRAINT "PK_2c999abb83ed046c8fbd36e3509" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "token" ("id" SERIAL NOT NULL, "resetPasswordToken" text, "resetPasswordExpires" TIMESTAMP WITH TIME ZONE, "verifyEmailToken" text, "verifyEmailExpires" TIMESTAMP WITH TIME ZONE, "builderLoginToken" text, "builderLoginExpire" TIMESTAMP WITH TIME ZONE, "userId" integer, CONSTRAINT "REL_94f168faad896c0786646fa3d4" UNIQUE ("userId"), CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_a76c5cd486f7779bd9c319afd27" UNIQUE ("name"), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "clock_in" ("id" SERIAL NOT NULL, "lat" double precision NOT NULL, "lng" double precision NOT NULL, "clockInTime" TIMESTAMP WITH TIME ZONE NOT NULL, "images" text array, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "jobId" integer, "staffId" integer, CONSTRAINT "PK_efa50342a3cf1bb1fc008790550" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "emailVerified" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "roleId" integer, "companyId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job" ("id" SERIAL NOT NULL, "address" text NOT NULL, "notes" character varying NOT NULL DEFAULT '', "priority" character varying NOT NULL DEFAULT '', "stage" character varying NOT NULL DEFAULT '', "lat" double precision, "lng" double precision, "status" text NOT NULL, "poFile" text, "requestDate" TIMESTAMP WITH TIME ZONE NOT NULL, "reminderSent" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "builderId" integer, CONSTRAINT "PK_98ab1c14ff8d1cf80d18703b92f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "activity" ("id" SERIAL NOT NULL, "type" text NOT NULL, "date" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_24625a1d6b1b089c8ae206fe467" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "job_staff" ("jobId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_386cb4a44464000c2481cbb43da" PRIMARY KEY ("jobId", "userId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6e26130bdc0b38de626a7c2efa" ON "job_staff" ("jobId") `);
        await queryRunner.query(`CREATE INDEX "IDX_39a84e36dbc8234ef7d7563467" ON "job_staff" ("userId") `);
        await queryRunner.query(`CREATE TABLE "job_equipment" ("jobId" integer NOT NULL, "equipmentId" integer NOT NULL, CONSTRAINT "PK_9bb05cd556eaa3f55ea9ea4c92e" PRIMARY KEY ("jobId", "equipmentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7e4322b953bf6bafe35f7366b5" ON "job_equipment" ("jobId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9bbeeb2871aa845f31aac539f3" ON "job_equipment" ("equipmentId") `);
        await queryRunner.query(`CREATE TABLE "job_activity" ("jobId" integer NOT NULL, "activityId" integer NOT NULL, CONSTRAINT "PK_7690759731a0d51faeda67c0843" PRIMARY KEY ("jobId", "activityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5b40fe4f1741c30d303de513cf" ON "job_activity" ("jobId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c06d592337fea9ca43bd302e24" ON "job_activity" ("activityId") `);
        await queryRunner.query(`ALTER TABLE "clock_off" ADD CONSTRAINT "FK_c4b36e3ed3dc2e81f479a296ea0" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clock_off" ADD CONSTRAINT "FK_28d01e28cb5846e7ab1a5405364" FOREIGN KEY ("staffId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "token" ADD CONSTRAINT "FK_94f168faad896c0786646fa3d4a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clock_in" ADD CONSTRAINT "FK_0ee4d75d67c41226f937ee83ea9" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "clock_in" ADD CONSTRAINT "FK_e842e02e5e890159bed3ca2fbb0" FOREIGN KEY ("staffId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_86586021a26d1180b0968f98502" FOREIGN KEY ("companyId") REFERENCES "company"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job" ADD CONSTRAINT "FK_523d3df8ab8dd979528488c6c68" FOREIGN KEY ("builderId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_staff" ADD CONSTRAINT "FK_6e26130bdc0b38de626a7c2efae" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "job_staff" ADD CONSTRAINT "FK_39a84e36dbc8234ef7d7563467f" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_equipment" ADD CONSTRAINT "FK_7e4322b953bf6bafe35f7366b5b" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "job_equipment" ADD CONSTRAINT "FK_9bbeeb2871aa845f31aac539f31" FOREIGN KEY ("equipmentId") REFERENCES "equipment"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "job_activity" ADD CONSTRAINT "FK_5b40fe4f1741c30d303de513cf8" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "job_activity" ADD CONSTRAINT "FK_c06d592337fea9ca43bd302e24e" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "job_activity" DROP CONSTRAINT "FK_c06d592337fea9ca43bd302e24e"`);
        await queryRunner.query(`ALTER TABLE "job_activity" DROP CONSTRAINT "FK_5b40fe4f1741c30d303de513cf8"`);
        await queryRunner.query(`ALTER TABLE "job_equipment" DROP CONSTRAINT "FK_9bbeeb2871aa845f31aac539f31"`);
        await queryRunner.query(`ALTER TABLE "job_equipment" DROP CONSTRAINT "FK_7e4322b953bf6bafe35f7366b5b"`);
        await queryRunner.query(`ALTER TABLE "job_staff" DROP CONSTRAINT "FK_39a84e36dbc8234ef7d7563467f"`);
        await queryRunner.query(`ALTER TABLE "job_staff" DROP CONSTRAINT "FK_6e26130bdc0b38de626a7c2efae"`);
        await queryRunner.query(`ALTER TABLE "job" DROP CONSTRAINT "FK_523d3df8ab8dd979528488c6c68"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_86586021a26d1180b0968f98502"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
        await queryRunner.query(`ALTER TABLE "clock_in" DROP CONSTRAINT "FK_e842e02e5e890159bed3ca2fbb0"`);
        await queryRunner.query(`ALTER TABLE "clock_in" DROP CONSTRAINT "FK_0ee4d75d67c41226f937ee83ea9"`);
        await queryRunner.query(`ALTER TABLE "token" DROP CONSTRAINT "FK_94f168faad896c0786646fa3d4a"`);
        await queryRunner.query(`ALTER TABLE "clock_off" DROP CONSTRAINT "FK_28d01e28cb5846e7ab1a5405364"`);
        await queryRunner.query(`ALTER TABLE "clock_off" DROP CONSTRAINT "FK_c4b36e3ed3dc2e81f479a296ea0"`);
        await queryRunner.query(`DROP INDEX "IDX_c06d592337fea9ca43bd302e24"`);
        await queryRunner.query(`DROP INDEX "IDX_5b40fe4f1741c30d303de513cf"`);
        await queryRunner.query(`DROP TABLE "job_activity"`);
        await queryRunner.query(`DROP INDEX "IDX_9bbeeb2871aa845f31aac539f3"`);
        await queryRunner.query(`DROP INDEX "IDX_7e4322b953bf6bafe35f7366b5"`);
        await queryRunner.query(`DROP TABLE "job_equipment"`);
        await queryRunner.query(`DROP INDEX "IDX_39a84e36dbc8234ef7d7563467"`);
        await queryRunner.query(`DROP INDEX "IDX_6e26130bdc0b38de626a7c2efa"`);
        await queryRunner.query(`DROP TABLE "job_staff"`);
        await queryRunner.query(`DROP TABLE "activity"`);
        await queryRunner.query(`DROP TABLE "job"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "clock_in"`);
        await queryRunner.query(`DROP TABLE "company"`);
        await queryRunner.query(`DROP TABLE "token"`);
        await queryRunner.query(`DROP TABLE "clock_off"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "equipment"`);
    }

}
