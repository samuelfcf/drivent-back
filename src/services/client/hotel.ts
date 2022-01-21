import Hotel from "@/entities/Hotel";
import Reservation from "@/entities/Reservation";
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
  const hotels = await Hotel.getAll();
  const result: HotelInfo[] = [];

  for (let i = 0; i < hotels.length; i++) {
    const availableRooms = await Room.getVacancyAmount(hotels[i].id);
    result.push({ ...hotels[i], availableRooms });
  }

  return result;
}

export async function saveOrUpdateReservation(userId: number, roomId: number) {
  const olderReservation = await Reservation.getByUserId(userId);

  if (olderReservation) {
    await Reservation.deleteByUserId(userId);
    await Room.updateCurrentOccupation(olderReservation.roomId, -1);
  }

  await Reservation.saveNew(userId, roomId);
  await Room.updateCurrentOccupation(roomId, 1);
}

export async function listRooms(hotelId: number) {
  return await Room.list(hotelId);
}

export async function getReservationByUserId(id: number) {
  const reservation = await Reservation.getByUserId(id);

  if (!reservation) {
    return null;
  }

  const {
    hotel,
    currentOccupation,
    maxOccupation,
    number: roomNumber,
  } = await Room.getByRoomId(reservation.roomId);

  return {
    roomNumber,
    maxOccupation,
    currentOccupation,
    hotelName: hotel.name,
    hotelImage: hotel.image,
  };
}
