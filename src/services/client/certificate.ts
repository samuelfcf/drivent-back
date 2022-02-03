import Certificate from "@/interfaces/certificate";
import Ticket from "@/entities/Ticket";
import Enrollment from "@/entities/Enrollment";

import NotFoundError from "@/errors/NotFoundError";

export async function getCertificateData(userId: number): Promise<Certificate> {
  const enrollment = await Enrollment.getByUserId(userId);

  if (!enrollment) throw new NotFoundError();

  const ticket = await Ticket.getByEnrollmentId(enrollment.id);

  if (!ticket || !ticket.isPaid) throw new NotFoundError();

  return {
    name: enrollment.name,
    cpf: enrollment.cpf,
    type: ticket.ticketsTypeId,
    activities: ticket.activities,
  };
}
