import { Request, Response } from "express";

import * as activityService from "@/services/client/activity";
import * as ticketService from "@/services/client/ticket";
import * as enrollmentService from "@/services/client/enrollment";

export async function getActivitiesLocals(req: Request, res: Response) {
  const locals = await activityService.getActivitiesLocals();
  return res.status(200).send(locals);
}

export async function getActivities(req: Request, res: Response) {
  const activities = await activityService.getActivities();
  return res.status(200).send(activities);
}

export async function signUpToActivity(req: Request, res: Response) {
  const activityId = Number(req.params.activityId);
  const enrollment = await enrollmentService.getEnrollmentWithAddress(req.user.id);
  const ticket = await ticketService.getTicketFromEnrollment(enrollment.id); 
  await activityService.signUpToActivity(ticket, activityId);
  return res.sendStatus(201);
}
