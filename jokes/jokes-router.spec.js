const server = require("../api/server.js");
const request = require("supertest");

describe("jokes router", () => {
  it("should return status 401 with no auth", async () => {
    const res = await request(server).get("/api/jokes");

    expect(res.status).toBe(401);
  });

  it("should respond with json", async () => {
    const res = await request(server).get("/api/jokes");

    expect(res.type).toBe("application/json");
  });
}); 