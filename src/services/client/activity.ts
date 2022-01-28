import Local from "@/entities/Local";
import Activity from "@/entities/Activity";

export async function getActivitiesLocals(): Promise<Local[]> {
  return await Local.getAll();
}

export async function getActivities(): Promise<Activity[]> {
  return await Activity.getAll();
}
