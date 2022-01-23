import Ticket from "@/entities/Ticket";

export async function getTicketFromEnrollment(enrollmentId: number) {
  return await Ticket.getByEnrollmentId(enrollmentId);
}

export async function updateTicketAsPaid(enrollmentId: number): Promise<void> { 
  return await Ticket.updateTicketAsPaid(enrollmentId);
}
