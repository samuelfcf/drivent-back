import Local from "@/entities/Local";

export async function getActivitiesLocals() {
  return await Local.getAll();
}
