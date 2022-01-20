import { getRepository } from "typeorm";
import Enrollment from "../../../src/entities/Enrollment";

export async function createEnrollment(userId: number) {
  const body = {
    name: "Test Name",
    cpf: "123.123.123-12",
    birthday: "06-01-2022",
    phone: "(86) 94534-5345",
    userId
  };

  let createdEnrollmentId: number;

  await getRepository(Enrollment)
    .insert(body)
    .then((result) => {
      createdEnrollmentId = result.identifiers[0].id;
    });

  return createdEnrollmentId;
}
