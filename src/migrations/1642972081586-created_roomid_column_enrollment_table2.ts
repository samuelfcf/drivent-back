import { MigrationInterface, QueryRunner } from "typeorm";

export class createdRoomidColumnEnrollmentTable21642972081586 implements MigrationInterface {
    name = "createdRoomidColumnEnrollmentTable21642972081586"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD CONSTRAINT \"UQ_de33d443c8ae36800c37c58c929\" UNIQUE (\"userId\")");
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD CONSTRAINT \"FK_de33d443c8ae36800c37c58c929\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP CONSTRAINT \"FK_de33d443c8ae36800c37c58c929\"");
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP CONSTRAINT \"UQ_de33d443c8ae36800c37c58c929\"");
    }
}
