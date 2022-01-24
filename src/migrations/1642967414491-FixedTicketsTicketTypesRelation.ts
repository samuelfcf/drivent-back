import { MigrationInterface, QueryRunner } from "typeorm";

export class FixedTicketsTicketTypesRelation1642967414491 implements MigrationInterface {
    name = "FixedTicketsTicketTypesRelation1642967414491"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_59dd44a1afada41f1531b06d133\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"UQ_59dd44a1afada41f1531b06d133\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_59dd44a1afada41f1531b06d133\" FOREIGN KEY (\"tickets_type_id\") REFERENCES \"ticket_types\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_59dd44a1afada41f1531b06d133\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"UQ_59dd44a1afada41f1531b06d133\" UNIQUE (\"tickets_type_id\")");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_59dd44a1afada41f1531b06d133\" FOREIGN KEY (\"tickets_type_id\") REFERENCES \"ticket_types\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }
}
