import supertest from "supertest";
import { getConnection } from "typeorm";
import { clearDatabase } from "../utils/database";
import app, { init } from "../../src/app";
import { createUser } from "./factories/userFactory";
import { createSession } from "./factories/sessionFactory";
import { createEnrollment } from "./factories/enrollmentFactory";
import { createTicket } from "./factories/ticketFactory";

beforeAll(async() => {  
  await init();
});

beforeEach(async() => {  
  await clearDatabase();
});

afterAll(async() => {
  await getConnection().close();
});

const agent = supertest(app);

describe("get tickets", () => {
  it("should answer with status 200 if user has a ticket", async() => {
    const userId = await createUser();
    const token = await createSession(userId);
    const enrollmentId = await createEnrollment(userId);
    createTicket(enrollmentId);

    const response = await agent.get("/tickets/user").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(200);
  });
});
