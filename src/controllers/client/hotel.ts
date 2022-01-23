import { Request, Response } from "express";

import * as hotelService from "@/services/client/hotel";
import * as enrollmentService from "@/services/client/enrollment";

import httpStatus from "http-status";

export async function get(_req: Request, res: Response) {
  const hotels = await hotelService.getAll();

  res.status(200).send(hotels);
}

export async function getRooms(req: Request, res: Response) {
  const hotelId = parseInt(req.params.hotelId);

  if (isNaN(hotelId)) {
    return res.sendStatus(400);
  }

  const rooms = await hotelService.listRooms(hotelId);

  res.send(rooms);
}

export async function saveBooking(req: Request, res: Response) {
  const roomId = parseInt(req.params.roomId);
  const userId = req.user.id;

  if (isNaN(roomId)) {
    return res.sendStatus(400);
  }

  await hotelService.saveOrUpdateBooking(userId, roomId);
  res.sendStatus(201);
}

export async function getBooking(req: Request, res: Response) {
  const enrollment = await enrollmentService.getEnrollmentWithAddress(req.user.id);
  
  if (!enrollment.roomId) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
  
  const booking = await hotelService.getRoomInfo(enrollment.roomId);
  return res.status(200).send(booking);
}
