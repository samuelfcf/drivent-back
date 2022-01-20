import dotenv from "dotenv";

let envFile = ".env.test";

if (process.env.NODE_ENV === "production") {
  envFile = ".env";
}

if (process.env.NODE_ENV === "development") {
  envFile = ".env.dev";
}

dotenv.config({ path: envFile });

