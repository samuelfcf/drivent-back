import { MigrationInterface, QueryRunner } from "typeorm";

export class UserEnrollmentRelation1642619757560 implements MigrationInterface {
    name = "UserEnrollmentRelation1642619757560"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD CONSTRAINT \"UQ_de33d443c8ae36800c37c58c929\" UNIQUE (\"userId\")");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"UQ_1ce5592b8fd5529a35fb9fe1460\" UNIQUE (\"enrollmentId\")");
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD CONSTRAINT \"FK_de33d443c8ae36800c37c58c929\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP CONSTRAINT \"FK_de33d443c8ae36800c37c58c929\"");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"UQ_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP CONSTRAINT \"UQ_de33d443c8ae36800c37c58c929\"");
    }
}
