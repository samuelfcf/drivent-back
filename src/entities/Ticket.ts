import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import Enrollment from "./Enrollment";
import TicketType from "./TicketType";
import TicketData from "@/interfaces/ticket";

import NotFoundError from "@/errors/NotFoundError";
import AlreadyPaidError from "@/errors/AlreadyPaidError";
import ConflictError from "@/errors/ConflictError";
import Activity from "./Activity";
@Entity("tickets")
export default class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @Column({ name: "is_paid" })
  isPaid: boolean;

  @Column({ name: "has_hotel" })
  hasHotel: boolean;

  @OneToOne(() => Enrollment, (enrollment) => enrollment.id, { eager: true })
  @JoinColumn({ name: "enrollment_id" })
  enrollmentId: number;

  @ManyToOne(() => TicketType, (ticketType) => ticketType.id, { eager: true })
  @JoinColumn({ name: "tickets_type_id" })
  ticketsTypeId: number;

  @ManyToMany(() => Activity, activity => activity.id)
  @JoinTable({
    name: "tickets_activities",
    joinColumn: {
      name: "ticket_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "activities_id",
      referencedColumnName: "id"
    }
  })
  activities: Activity[]

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
