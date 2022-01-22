import Ticket from "@/entities/Ticket";
import TicketData from "@/interfaces/ticket";

export async function getTicketFromEnrollment(enrollmentId: number) {
  return await Ticket.getByEnrollmentId(enrollmentId);
}

export async function createTicket(data: TicketData) {
  return await Ticket.createTicket(data);
}
