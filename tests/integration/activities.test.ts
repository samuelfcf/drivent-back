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

describe("activities related tests", () => {
  it("should answer with status 200 activities list is returned", async() => {
    const token = await populateDatabase();

    const response = await agent.get("/activities").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(200);
  });

  it("should return activities list with expected body", async() => {
    const token = await populateDatabase();

    const response = await agent.get("/activities").set("Authorization", `Bearer ${token}`);
    
    expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({
      id: expect.any(Number),
      duration: expect.any(Number),
      date: expect.any(String),
      name: expect.any(String),
      freeSpots: expect.any(Number),
      local: expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
      })
    })]));
  });
});
