import supertest from "supertest";
import { getConnection } from "typeorm";
import { clearDatabase, populateDatabase } from "../utils/database";
import app, { init } from "../../src/app";

beforeAll(async() => {  
  await init();
});

afterAll(async() => {
  await getConnection().close();
});

const agent = supertest(app);

describe("get tickets", () => {
  afterAll(async() => {  
    await clearDatabase();
  });

  it("should answer with status 200 if user has a ticket", async() => {
    const token = await populateDatabase();

    const response = await agent.get("/tickets/user").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(200);
  });
});

describe("pay ticket", () => {
  let token: string;
  let enrollmentId: number;

  beforeAll(async() => {
    const userId = await createUser();
    token = await createSession(userId);
    enrollmentId = await createEnrollment(userId);
  });

  afterAll(async() => {  
    await clearDatabase();
  });

  it("should return 404 for a user without ticket", async() => {
    const response = await agent.put("/tickets/pay").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should return 200 for a non paid ticket", async() => {
    await createTicket(enrollmentId);

    const response = await agent.put("/tickets/pay").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should return 400 for a already paid ticket", async() => {
    const response = await agent.put("/tickets/pay").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(400);
  });
});
