import Enrollment from "@/entities/Enrollment";
import Hotel from "@/entities/Hotel";
import Room from "@/entities/Room";

interface HotelInfo {
  id: number;
  name: string;
  image: string;
  vacancies: number;
  hotelTypes: string[];
}

export async function getAll() {
  const hotels: HotelInfo[] = await Hotel.getAll();
  return hotels;
}

export async function listRooms(hotelId: number) {  
  const rooms = await Room.list(hotelId);
  const result: { occupied: number; id: number; number: string; max_occupation: number; hotelId: number; hotel: Hotel; enrollment: Enrollment[]; }[] = [];
  rooms.forEach((room) => {
    result.push({
      ...room, occupied: room.enrollment.length
    });
  });
  return result;  
}

export async function saveOrUpdateBooking(userId: number, roomId: number) {
  const previousBooking = await Enrollment.getByUserId(userId);
  if(previousBooking) {
    await Enrollment.deleteByUserId(userId);
    await Enrollment.saveNewBooking(userId, roomId);
  }

  await Enrollment.saveNewBooking(userId, roomId);
}

export async function getBookingFromUser(userId: number) {
  const enrollment = await Enrollment.getByUserId(userId);
  const roomId = enrollment.roomId;
  const booking = await Room.getByRoomId(roomId);
  return booking;
}
