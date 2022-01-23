import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import Enrollment from "./Enrollment";
import TicketType from "./TicketType";
import TicketData from "@/interfaces/ticket";
import ConflictError from "@/errors/ConflictError";
@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column({ name: "is_paid" })
  isPaid: boolean;

  @OneToOne(() => Enrollment, (enrollment) => enrollment.id, { eager: true })
  @JoinColumn({ name: "enrollment_id" })
  enrollmentId: number;

  @OneToOne(() => TicketType, (ticketType) => ticketType.id, { eager: true })
  @JoinColumn({ name: "tickets_type_id" })
  ticketsTypeId: number;

  @Column({ name: "has_hotel" })
  hasHotel: boolean;

  populateFromData(data: TicketData) {
    this.value = data.value;
    this.isPaid = data.isPaid;
    this.enrollmentId = data.enrollmentId;
    this.ticketsTypeId = data.ticketTypeId;
    this.hasHotel = data.hasHotel;
  }

  static async getByEnrollmentId(enrollmentId: number) {   
    return this.findOne({ where: { enrollmentId } });
  }

  static async createTicket(ticketData: TicketData) {
    const ticketExists = await this.getByEnrollmentId(ticketData.enrollmentId);

    if (ticketExists) {
      throw new ConflictError("Essa reserva já possui ticket!");
    }

    const ticket = Ticket.create();
    ticket.populateFromData(ticketData);
    await ticket.save();
  }
}
