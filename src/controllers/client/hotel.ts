import { Request, Response } from "express";

import * as service from "@/services/client/hotel";

export async function get(_req: Request, res: Response) {
  const hotels = await service.getAll();

  res.status(200).send(hotels);
}

export async function getRooms(req: Request, res: Response) {
  const hotelId = parseInt(req.params.hotelId);

  if (isNaN(hotelId)) {
    return res.sendStatus(400);
  }

  const rooms = await service.listRooms(hotelId);

  res.send(rooms);
}

export async function saveReservation(req: Request, res: Response) {
  const roomId = parseInt(req.params.roomId);
  const userId = req.user.id;

  if (isNaN(roomId)) {
    return res.sendStatus(400);
  }

  await service.saveOrUpdateReservation(userId, roomId);
  res.sendStatus(201);
}

export async function getReservation(req: Request, res: Response) {
  const reservation = await service.getReservationByUserId(req.user.id);

  res.send(reservation);
}
