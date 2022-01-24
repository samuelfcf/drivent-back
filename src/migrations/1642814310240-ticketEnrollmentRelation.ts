import { MigrationInterface, QueryRunner } from "typeorm";

export class ticketEnrollmentRelation1642814310240 implements MigrationInterface {
    name = "ticketEnrollmentRelation1642814310240"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"enrollment_id\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"UQ_1323d8d191f4ca0cb037310f79f\" UNIQUE (\"enrollment_id\")");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_1323d8d191f4ca0cb037310f79f\" FOREIGN KEY (\"enrollment_id\") REFERENCES \"enrollments\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_1323d8d191f4ca0cb037310f79f\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"UQ_1323d8d191f4ca0cb037310f79f\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ALTER COLUMN \"enrollment_id\" SET NOT NULL");
    }
}
