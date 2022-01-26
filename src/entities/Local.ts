import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Activity from "./Activity";

@Entity("locals")
export default class Local extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  readonly id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @OneToMany(() => Activity, activities => activities.local)
  activities: Activity[];

  static async getAll() {
    return await this.find();
  }
}
