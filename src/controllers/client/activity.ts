import { Request, Response } from "express";

import * as activityService from "@/services/client/activity";

export async function getActivitiesLocals(req: Request, res: Response) {
  const locals = await activityService.getActivitiesLocals();
  return res.status(200).send(locals);
}

export async function getActivities(req: Request, res: Response) {
  const activities = await activityService.getActivities();
  return res.status(200).send(activities);
}
