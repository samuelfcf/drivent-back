import { Request, Response } from "express";

import * as activityService from "@/services/client/activity";

export async function getActivitiesLocals(req: Request, res: Response) {
  const locals = await activityService.getActivitiesLocals();
  res.status(200).send(locals);
}
