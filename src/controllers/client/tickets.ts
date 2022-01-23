import { Request, Response } from "express";
import httpStatus from "http-status";

import * as ticketService from "@/services/client/ticket";
import * as enrollmentService from "@/services/client/enrollment";

export async function getTicketFromUser(req: Request, res: Response) { 
  const enrollmentInfo = await enrollmentService.getEnrollmentWithAddress(req.user.id);

  if(!enrollmentInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }

  const ticketInfo = await ticketService.getTicketFromEnrollment(enrollmentInfo.id);
 
  if(!ticketInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.send(ticketInfo).status(httpStatus.OK);
}

export async function updateTicketAsPaid(req: Request, res: Response) {
  const enrollmentInfo = await enrollmentService.getEnrollmentWithAddress(req.user.id);

  await ticketService.updateTicketAsPaid(enrollmentInfo.id);

  return res.sendStatus(httpStatus.OK);
}
