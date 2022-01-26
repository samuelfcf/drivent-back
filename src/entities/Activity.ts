import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Locals from "./Locals";

@Entity("activities")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  readonly id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "timestamp", nullable: false })
  date: Date;

  @Column({ type: "integer", nullable: false })
  vacancies: number;

  @Column({ type: "integer", nullable: false })
  duration: number;

  @ManyToOne(() => Locals, locals => locals.activities)
  locals: Locals;

  static async getAll() {
    return await this.find();
  }
}
