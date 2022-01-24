import { MigrationInterface, QueryRunner } from "typeorm";

export class updateRoomId1642785519913 implements MigrationInterface {
    name = "updateRoomId1642785519913"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" ALTER COLUMN \"roomId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"enrollments\" ADD CONSTRAINT \"FK_e83343188f16374ed7e32b5887c\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"enrollments\" DROP CONSTRAINT \"FK_e83343188f16374ed7e32b5887c\"");
      await queryRunner.query("ALTER TABLE \"enrollments\" ALTER COLUMN \"roomId\" SET NOT NULL");
    }
}
