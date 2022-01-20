import { getRepository } from "typeorm";
import Address from "../../../src/entities/Address";

export async function createAddress(enrollmentId: number) {
  const body = {
    cep: "11111-123",
    street: "Street",
    city: "City",
    number: "10",
    state: "State",
    neighborhood: "Neighborhood",
    addressDetail: "Detail",
    enrollmentId
  };
  
  await getRepository(Address).insert(body);
}
