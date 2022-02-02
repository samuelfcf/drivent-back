import ConflictError from "@/errors/ConflictError";
import dayjs, { Dayjs } from "dayjs";
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
      tickets: activity.tickets,
    }));
  }

  static async saveTicketToActivity(ticket: Ticket, activityId: number) {
    const activity = await Activity.findOne( { where: { id: activityId, }, relations: ["tickets"] });
    const activityStart = dayjs(activity.date);
    const activityEnd = activityStart.add(activity.duration - 1, "minutes");

    function timeConflictVerify(start: Dayjs, end: Dayjs) {     
      if ((start <= activityStart && end >= activityStart) || (start >= activityStart && end <= activityEnd) || (start <= activityEnd && end >= activityEnd )) {
        return true;
      }
      return false;
    }

    const conflictingActivity = ticket.activities.find((act) => {
      const actStart = dayjs(act.date);
      const actEnd = actStart.add(act.duration - 1, "minutes");
      return timeConflictVerify(actStart, actEnd);
    });
    
    if (conflictingActivity) {
      throw new ConflictError("Você já está registrado em outra atividade com o mesmo horário.");
    }
    
    activity.tickets.push(ticket);
    await activity.save();
  }

  static async removeActivityFromTicket(ticket: Ticket, activityId: number) {
    const activity = await Activity.findOne( { where: { id: activityId, }, relations: ["tickets"] });
    const signOutTimeLimit = dayjs(activity.date).subtract(12, "hours");
    
    if (dayjs() > signOutTimeLimit) {
      throw new Error("O período para se desinscrever de uma atividade já passou");
    }

    activity.tickets = activity.tickets.filter((tix) => tix.id !== ticket.id);
    await activity.save();
  }
}
