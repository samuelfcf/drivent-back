import { Request, Response } from "express";
import httpStatus from "http-status";

import * as ticketService from "@/services/client/ticket";
import * as enrollmentService from "@/services/client/enrollment";
import TicketData from "@/interfaces/ticket";

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

export async function createTicket(req: Request, res: Response) {
  const ticketData = req.body as TicketData;
  await ticketService.createTicket(ticketData);
  res.send(httpStatus.OK);
}

export async function getTicketsTypes(req: Request, res: Response) {
  const tickets = await ticketService.getTicketsTypes();

  if (tickets.length === 0) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.status(httpStatus.OK).send(tickets);
}
