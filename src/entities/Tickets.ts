import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  value: string;

  @Column({ name: "is_paid" })
  isPaid: boolean;

  @Column({ name: "enrollment_id" })
  enrollmentId: number;

  @Column({ name: "tickets_type_id" })
  ticketsTypeId: number;

  @Column({ name: "has_hotel" })
  hasHotel: boolean;

  static async getByEnrollmentId(enrollmentId: number) {
    return await this.findOne({ where: { enrollmentId } });
  }
}
