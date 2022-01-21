import Hotel from "@/entities/Hotel";
import Room from "@/entities/Room";

interface HotelInfo {
  id: number;
  name: string;
  maxRoomOccupation: number;
  image: string;
  totalRooms: number;
  availableRooms: number;
}

export async function getAll() {
  //const hotels = await Hotel.getAll();
  const result: HotelInfo[] = [];
  return result;
}

export async function listRooms(hotelId: number) {
  return await Room.list(hotelId);
}
