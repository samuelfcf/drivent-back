import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import TicketType from "./TicketType";

import NotFoundError from "@/errors/NotFoundError";
import AlreadyPaidError from "@/errors/AlreadyPaidError";

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

  static async updateTicketAsPaid(enrollmentId: number): Promise<void> {
    const ticket = await this.getByEnrollmentId(enrollmentId);

    if (!ticket) throw new NotFoundError();
    if (ticket.isPaid) throw new AlreadyPaidError();

    await this.update(
      ticket.id,
      {
        isPaid: true,
      }
    );
  }
}
