import Ticket from "@/entities/Ticket";

export async function getTicketFromEnrollment(enrollmentId: number) {
  return await Ticket.getByEnrollmentId(enrollmentId);
}
