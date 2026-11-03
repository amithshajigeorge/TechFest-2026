const request = require("supertest");
const app = require("../server");

describe("TechFest API", () => {

  test("Health check should return status 200", async () => {

    const response = await request(app)
      .get("/api/health");

    expect(response.statusCode).toBe(200);

    expect(response.body.status).toBe("OK");

  });

});