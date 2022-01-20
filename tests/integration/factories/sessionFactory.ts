import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import Session from "../../../src/entities/Session";

export async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  const body = {
    userId,
    token,
  };

  await getRepository(Session).insert(body);

  return token;
}
