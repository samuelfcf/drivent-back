import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatedTicketTypeTable1642640126906 implements MigrationInterface {
    name = "CreatedTicketTypeTable1642640126906"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"ticket_types\" (\"id\" SERIAL NOT NULL, \"name\" character varying NOT NULL, \"value\" integer NOT NULL, CONSTRAINT \"PK_5510ce7e18a4edc648c9fbfc283\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"tickets_type_id\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"UQ_59dd44a1afada41f1531b06d133\" UNIQUE (\"tickets_type_id\")");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_59dd44a1afada41f1531b06d133\" FOREIGN KEY (\"tickets_type_id\") REFERENCES \"ticket_types\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_59dd44a1afada41f1531b06d133\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"UQ_59dd44a1afada41f1531b06d133\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"tickets_type_id\" SET NOT NULL");
      await queryRunner.query("DROP TABLE \"ticket_types\"");
    }
}
