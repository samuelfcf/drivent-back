import ConflictError from "@/errors/ConflictError";
import NotFoundError from "@/errors/NotFoundError";
import NoVacanciesError from "@/errors/NoVacanciesError";
import UnsubscribeTimeOverError from "@/errors/UnsubscribeTimeOverError";
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

  private static generateReturn(activity: Activity) {
    return {
      id: activity.id,
      duration: activity.duration,
      date: activity.date,
      name: activity.name,
      local: activity.local,
      freeSpots: activity.vacancies - activity.tickets.length,
      tickets: activity.tickets,
    };
  }

  static async getAll() {
    const activities = await this.find({ relations: ["local", "tickets"] });

    return activities.map(activity => (this.generateReturn(activity)));
  }

  static async saveTicketToActivity(ticket: Ticket, activityId: number) {
    const activity = await Activity.findOne( { where: { id: activityId, }, relations: ["tickets"] });

    const isSubscribed = activity.tickets.find((tix) => tix.id === ticket.id);
    
    if (isSubscribed) {
      throw new ConflictError("Voc?? j?? est?? registrado nesta atividade!", this.generateReturn(activity));
    }
    
    if (!activity) {
      throw new NotFoundError();
    }

    if (activity.vacancies <= activity.tickets.length) {
      throw new NoVacanciesError(this.generateReturn(activity));
    }

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
      throw new ConflictError("Voc?? j?? est?? registrado em outra atividade com o mesmo hor??rio.", this.generateReturn(activity));
    }
    
    activity.tickets.push(ticket);
    await activity.save();
  }

  static async removeActivityFromTicket(ticket: Ticket, activityId: number) {
    const activity = await Activity.findOne( { where: { id: activityId, }, relations: ["tickets"] });
    
    if (!activity) {
      throw new NotFoundError();
    }
    
    const signOutTimeLimit = dayjs(activity.date).subtract(12, "hours");
    
    if (dayjs() > signOutTimeLimit) {
      throw new UnsubscribeTimeOverError();
    }

    activity.tickets = activity.tickets.filter((tix) => tix.id !== ticket.id);
    await activity.save();
    return this.generateReturn(activity);
  }
}
