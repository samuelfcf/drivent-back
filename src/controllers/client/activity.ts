import { Request, Response } from "express";

import * as activityService from "@/services/client/activity";
import * as ticketService from "@/services/client/ticket";
import * as enrollmentService from "@/services/client/enrollment";
import InvalidDataError from "@/errors/InvalidData";

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
  if (isNaN(activityId)) {
    throw new InvalidDataError("activityId", ["O id da atividade deve ser um número inteiro"]);
  }
  const enrollment = await enrollmentService.getEnrollmentWithAddress(req.user.id);
  const ticket = await ticketService.getTicketFromEnrollment(enrollment.id); 
  await activityService.signUpToActivity(ticket, activityId);
  return res.sendStatus(201);
}

export async function signOutFromActivity(req: Request, res: Response) {
  const activityId = Number(req.params.activityId);
  if (isNaN(activityId)) {
    throw new InvalidDataError("activityId", ["O id da atividade deve ser um número inteiro"]);
  }
  const enrollment = await enrollmentService.getEnrollmentWithAddress(req.user.id);
  const ticket = await ticketService.getTicketFromEnrollment(enrollment.id);  
  await activityService.signOutFromActivity(ticket, activityId);
  return res.sendStatus(200);
}
