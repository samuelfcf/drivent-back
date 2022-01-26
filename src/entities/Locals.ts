import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Activities from "./Activities";

@Entity("locals")
export default class Locals extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "integer" })
  readonly id: number;

  @Column({ type: "text", nullable: false })
  name: string;

  @OneToMany(() => Activities, activities => activities.locals)
  activities: Activities[];

  static async getAll() {
    return await this.find();
  }
}
