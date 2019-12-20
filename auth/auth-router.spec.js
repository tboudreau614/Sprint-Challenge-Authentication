const server = require("../api/server.js");
const request = require("supertest");
const db = require("../database/dbConfig.js");

describe('root', () => {
  test('env should be testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });
});

describe('register function', () => {
  it('should return 201', async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({
        username: "lambda",
        password: "lambdaschool"
      });
    expect(res.status).toBe(201);
  });

  it("should return json", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({
        username: "lambda",
        password: "lambdaschool"
      });
    expect(res.type).toBe("application/json");
  });

  it("returns user id", async () => {
    const res = await request(server)
      .post("/api/auth/register")
      .send({
        username: "lambda",
        password: "lambdaschool"
      });
    expect(res.body.id).not.toBeNaN();
  });

  beforeEach(async () => {
    await db("users").truncate();
  });
});

describe("login functionality", () => {
  it("should return 200", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "lambda", password: "lambdaschool" });

    expect(res.status).toBe(200);
  });

  it("should return token", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "lambda", password: "lambdaschool" });

    expect(res.body.token).toBeTruthy();
  });

  it("should return json", async () => {
    const res = await request(server)
      .post("/api/auth/login")
      .send({ username: "lambda", password: "lambdaschool" });

    expect(res.type).toBe("application/json");
  });
}); 