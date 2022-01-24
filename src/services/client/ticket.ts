import Ticket from "@/entities/Ticket";
import TicketType from "@/entities/TicketType";
import TicketData from "@/interfaces/ticket";

export async function getTicketFromEnrollment(enrollmentId: number) {
  return await Ticket.getByEnrollmentId(enrollmentId);
}

export async function updateTicketAsPaid(enrollmentId: number): Promise<void> { 
  return await Ticket.updateTicketAsPaid(enrollmentId);
}

export async function createTicket(data: TicketData) {
  return await Ticket.createTicket(data);
}

export async function getTicketsTypes() {
  return TicketType.getAll();
}
