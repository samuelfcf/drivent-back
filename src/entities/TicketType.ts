import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("ticket_types")
export default class TicketType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: number;

  static async getAll() {
    return await this.find();
  }
}
