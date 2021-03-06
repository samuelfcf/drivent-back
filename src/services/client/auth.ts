import jwt from "jsonwebtoken";

import InvalidUserError from "@/errors/InvalidUserError";
import User from "@/entities/User";
import Session from "@/entities/Session";

export async function signIn(email: string, password: string) {
  const user = await User.findByEmailAndPassword(email, password);

  if (!user) {
    throw new InvalidUserError();
  }

  const token = jwt.sign({
    userId: user.id
  }, process.env.JWT_SECRET);

  const session = await Session.createNew(user.id, token);

  return {
    user: {
      id: user.id,
      email: user.email
    },

    token
  };
}
