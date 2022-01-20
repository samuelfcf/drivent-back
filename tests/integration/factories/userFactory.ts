import { getRepository } from "typeorm";
import bcrypt from "bcrypt";
import User from "../../../src/entities/User";

export async function createUser() {
  const body = {
    email: "test@email.com",
    password: bcrypt.hashSync("testpass", 12),
    createdAt: new Date(Date.now()),
  };  

  let createdUserId: number;

  await getRepository(User)
    .insert(body)
    .then((result) => {
      createdUserId = result.identifiers[0].id;
    });

  return createdUserId;
}
