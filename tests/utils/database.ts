import { getRepository } from "typeorm";

import Ticket from "../../src/entities/Ticket";
import User from "../../src/entities/User";
import Enrollment from "../../src/entities/Enrollment";
import Address from "../../src/entities/Address";
import Session from "../../src/entities/Session";
import { createUser } from "../integration/factories/userFactory";
import { createSession } from "../integration/factories/sessionFactory";
import { createEnrollment } from "../integration/factories/enrollmentFactory";
import { createTicket } from "../integration/factories/ticketFactory";
import { createHotel } from "../integration/factories/hotelFactory";
import { createRoom } from "../integration/factories/RoomFactory";

export async function clearDatabase() {
  await getRepository(Session).delete({});
  await getRepository(Address).delete({});
  await getRepository(Ticket).delete({});
  await getRepository(Enrollment).delete({});
  await getRepository(User).delete({});
}

export async function populateDatabase() {
  const userId = await createUser();
  const token = await createSession(userId);  
  const hotelId = await createHotel();
  const roomId = await createRoom(hotelId);
  const enrollmentId = await createEnrollment(userId, roomId);
  createTicket(enrollmentId);

  return token;
}
