import Local from "@/entities/Local";
import Activity from "@/entities/Activity";
import Ticket from "@/entities/Ticket";

export async function getActivitiesLocals(): Promise<Local[]> {
  return await Local.getAll();
}

export async function getActivities() {
  return await Activity.getAll();
}

export async function signUpToActivity(ticket: Ticket, activityId: number) {
  await Activity.saveTicketToActivity(ticket, activityId);
}

export async function signOutFromActivity(ticket: Ticket, activityId: number) {
  await Activity.removeActivityFromTicket(ticket, activityId);
}
