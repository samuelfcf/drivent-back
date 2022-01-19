import { Request, Response } from "express";
import httpStatus from "http-status";

import * as ticketService from "@/services/client/ticket";

export async function getTicketInfo(req: Request, res: Response) {  
  const ticketInfo = await ticketService.getTicketFromEnrollment(Number(req.params.enrollmentId));

  if(!ticketInfo) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  res.send(ticketInfo).status(httpStatus.OK);
}
