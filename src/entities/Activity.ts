import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Local from "./Local";
import Ticket from "./Ticket";

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

  @ManyToOne(() => Local, local => local.activities)
  local: Local;

  @ManyToMany(() => Ticket, ticket => ticket.activities)
  @JoinTable({
    name: "tickets_activities",
    joinColumn: {
      name: "activities_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "ticket_id",
      referencedColumnName: "id"
    }
  })
  tickets: Ticket[];

  static async getAll() {
    const activities = await this.find({ relations: ["local", "tickets"] });

    return activities.map(activity => ({
      id: activity.id,
      duration: activity.duration,
      date: activity.date,
      name: activity.name,
      local: activity.local,
      freeSpots: activity.vacancies - activity.tickets.length,
    }));
  }
}
