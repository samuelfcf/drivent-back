import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import TicketType from "./TicketType";

@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column({ name: "is_paid" })
  isPaid: boolean;

  @Column({ name: "enrollment_id" })
  enrollmentId: number;

  @OneToOne(() => TicketType, (ticketType) => ticketType.id, { eager: true })
  @JoinColumn({ name: "tickets_type_id" })
  ticketsTypeId: number;

  @Column({ name: "has_hotel" })
  hasHotel: boolean;

  static async getByEnrollmentId(enrollmentId: number) {   
    return this.findOne({ where: { enrollmentId } });
  }
}
