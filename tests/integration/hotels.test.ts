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

describe("reservation related tests", () => {
  it("should answer with status 200 if user has a reservation", async() => {
    const token = await populateDatabase();

    const response = await agent.get("/hotels/reservation").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(200);
  });

  it("should return with expected body", async() => {
    const token = await populateDatabase();

    const response = await agent.get("/hotels/reservation").set("Authorization", `Bearer ${token}`);
    
    expect(response.body).toEqual(expect.objectContaining({
      hotelImage: expect.any(String),
      hotelName: expect.any(String),
      roomCurOccupation: expect.any(Number),
      roomNumber: expect.any(String),
      roomMaxOccupation: expect.any(Number),
    }));
  });
});
