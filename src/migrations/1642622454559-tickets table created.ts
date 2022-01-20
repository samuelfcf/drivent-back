import { MigrationInterface, QueryRunner } from "typeorm";

export class ticketsTableCreated1642622454559 implements MigrationInterface {
    name = "ticketsTableCreated1642622454559"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"tickets\" (\"id\" SERIAL NOT NULL, \"value\" character varying NOT NULL, \"is_paid\" boolean NOT NULL, \"enrollment_id\" integer NOT NULL, \"tickets_type_id\" integer NOT NULL, \"has_hotel\" boolean NOT NULL, CONSTRAINT \"PK_343bc942ae261cf7a1377f48fd0\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" DROP CONSTRAINT \"UQ_1ce5592b8fd5529a35fb9fe1460\"");
      await queryRunner.query("ALTER TABLE \"addresses\" ADD CONSTRAINT \"FK_1ce5592b8fd5529a35fb9fe1460\" FOREIGN KEY (\"enrollmentId\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("DROP TABLE \"tickets\"");
    }
}
