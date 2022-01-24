import { getRepository } from "typeorm";
import Room from "../../../src/entities/Room";

export async function createRoom(hotelId: number) {
  const body = {
    number: "101",
    max_occupation: 2,
    hotelId,
  };
  let createdRoomId: number;
  
  await getRepository(Room).insert(body).then((result) => {
    createdRoomId = result.identifiers[0].id;
  });

  return createdRoomId;
}
