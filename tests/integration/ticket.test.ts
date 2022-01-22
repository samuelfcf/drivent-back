import supertest from "supertest";
import { getConnection } from "typeorm";
import { clearDatabase, populateDatabase } from "../utils/database";
import app, { init } from "../../src/app";

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
    const token = await populateDatabase();

    const response = await agent.get("/tickets/user").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(200);
  });
});
