import { getRepository } from "typeorm";
import Ticket from "../../../src/entities/Ticket";

export async function createTicket(enrollmentId: number) {
  const body = {
    value: "100",
    isPaid: false,
    enrollmentId,
    ticketsTypeId: 1,
    hasHotel: true
  };

  let createdTicketId: number;
  
  await getRepository(Ticket)
    .insert(body)
    .then((result) => createdTicketId = result.identifiers[0].id);

  return createdTicketId;
}
