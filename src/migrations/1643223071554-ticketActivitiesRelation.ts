import { MigrationInterface, QueryRunner } from "typeorm";

export class ticketActivitiesRelation1643223071554 implements MigrationInterface {
    name = "ticketActivitiesRelation1643223071554"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"locals\" (\"id\" SERIAL NOT NULL, \"name\" text NOT NULL, CONSTRAINT \"PK_56d0b7be926a53ceddcfe4abb1a\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"activities\" (\"id\" SERIAL NOT NULL, \"name\" text NOT NULL, \"date\" TIMESTAMP NOT NULL, \"vacancies\" integer NOT NULL, \"duration\" integer NOT NULL, \"localsId\" integer, CONSTRAINT \"PK_7f4004429f731ffb9c88eb486a8\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"tickets_activities\" (\"ticket_id\" integer NOT NULL, \"activities_id\" integer NOT NULL, CONSTRAINT \"PK_59d61fb754bad20dcdd743d690a\" PRIMARY KEY (\"ticket_id\", \"activities_id\"))");
      await queryRunner.query("CREATE INDEX \"IDX_c4a32e607493fc0bec4aa4bf5d\" ON \"tickets_activities\" (\"ticket_id\") ");
      await queryRunner.query("CREATE INDEX \"IDX_5a5819a4518615fc820e7fe76c\" ON \"tickets_activities\" (\"activities_id\") ");
      await queryRunner.query("ALTER TABLE \"activities\" ADD CONSTRAINT \"FK_a53bfbd106e619c471c4600e3ae\" FOREIGN KEY (\"localsId\") REFERENCES \"locals\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"tickets_activities\" ADD CONSTRAINT \"FK_c4a32e607493fc0bec4aa4bf5df\" FOREIGN KEY (\"ticket_id\") REFERENCES \"tickets\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
      await queryRunner.query("ALTER TABLE \"tickets_activities\" ADD CONSTRAINT \"FK_5a5819a4518615fc820e7fe76c1\" FOREIGN KEY (\"activities_id\") REFERENCES \"activities\"(\"id\") ON DELETE CASCADE ON UPDATE CASCADE");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets_activities\" DROP CONSTRAINT \"FK_5a5819a4518615fc820e7fe76c1\"");
      await queryRunner.query("ALTER TABLE \"tickets_activities\" DROP CONSTRAINT \"FK_c4a32e607493fc0bec4aa4bf5df\"");
      await queryRunner.query("ALTER TABLE \"activities\" DROP CONSTRAINT \"FK_a53bfbd106e619c471c4600e3ae\"");
      await queryRunner.query("DROP INDEX \"IDX_5a5819a4518615fc820e7fe76c\"");
      await queryRunner.query("DROP INDEX \"IDX_c4a32e607493fc0bec4aa4bf5d\"");
      await queryRunner.query("DROP TABLE \"tickets_activities\"");
      await queryRunner.query("DROP TABLE \"activities\"");
      await queryRunner.query("DROP TABLE \"locals\"");
    }
}
