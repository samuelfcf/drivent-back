import Ticket from "@/entities/Tickets";

export async function getTicketFromEnrollment(enrollmentId: number) {
  return await Ticket.getByEnrollmentId(enrollmentId);
}
