import { MigrationInterface, QueryRunner } from "typeorm";

export class hotelMigration1642777336408 implements MigrationInterface {
    name = "hotelMigration1642777336408"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP CONSTRAINT \"FK_de33d443c8ae36800c37c58c929\"");
      await queryRunner.query("CREATE TABLE \"hotels\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"image\" character varying NOT NULL, CONSTRAINT \"PK_2bb06797684115a1ba7c705fc7b\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"rooms\" (\"id\" SERIAL NOT NULL, \"number\" character varying NOT NULL, \"max_occupation\" integer NOT NULL, \"hotelId\" integer NOT NULL, CONSTRAINT \"PK_0368a2d7c215f2d0458a54933f2\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD \"roomId\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP CONSTRAINT \"UQ_de33d443c8ae36800c37c58c929\"");
      await queryRunner.query("ALTER TABLE \"rooms\" ADD CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" DROP CONSTRAINT \"FK_e9d4d68c8c47b7fe47b8e233f60\"");
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD CONSTRAINT \"UQ_de33d443c8ae36800c37c58c929\" UNIQUE (\"userId\")");
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP COLUMN \"roomId\"");
      await queryRunner.query("DROP TABLE \"rooms\"");
      await queryRunner.query("DROP TABLE \"hotels\"");
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD CONSTRAINT \"FK_de33d443c8ae36800c37c58c929\" FOREIGN KEY (\"userId\") REFERENCES \"users\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
