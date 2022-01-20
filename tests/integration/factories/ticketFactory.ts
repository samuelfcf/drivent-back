import { getRepository } from "typeorm";
import Ticket from "../../../src/entities/Ticket";

export async function createTicket(enrollmentId: number) {
  const body = {
    value: "100",
    isPaid: true,
    enrollmentId,
    ticketsTypeId: 1,
    hasHotel: true
  };
  
  await getRepository(Ticket).insert(body);
}
