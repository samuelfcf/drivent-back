import { getRepository } from "typeorm";
import Hotel from "../../../src/entities/Hotel";

export async function createHotel() {
  const body = {
    name: "Hotel Name",
    image: "hotelimage.jpg",
  };
  let createdHotelId: number;
  
  await getRepository(Hotel).insert(body).then((result) => {
    createdHotelId = result.identifiers[0].id;
  });

  return createdHotelId;
}
