import { getRepository } from "typeorm";

import Ticket from "../../src/entities/Ticket";
import User from "../../src/entities/User";
import Enrollment from "../../src/entities/Enrollment";
import Address from "../../src/entities/Address";
import Session from "../../src/entities/Session";

export async function clearDatabase() {
  await getRepository(Session).delete({});
  await getRepository(Address).delete({});
  await getRepository(Ticket).delete({});
  await getRepository(Enrollment).delete({});
  await getRepository(User).delete({});
}
