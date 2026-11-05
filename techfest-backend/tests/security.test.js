const request = require("supertest");
const app = require("../server");

describe("Security & OWASP Preventive Measures", () => {
  test("NoSQL injection attempt in login should be rejected with 400", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: { $gt: "" },
        password: { $gt: "" }
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/Invalid input format/i);
  });

  test("NoSQL injection attempt in register should be rejected with 400", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Hacker",
        email: { $ne: null },
        password: "password123"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/Invalid input format/i);
  });

  test("Protected POST /api/events without token should return 401", async () => {
    const response = await request(app)
      .post("/api/events")
      .send({
        name: "Unauthorized Event",
        category: "Technical",
        fee: 0,
        seats: 50,
        date: "2026-03-20"
      });

    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("No token provided");
  });

  test("Invalid event ID format should be rejected with 400", async () => {
    const response = await request(app)
      .get("/api/events/invalid-mongo-id-123");

    expect(response.statusCode).toBe(400);
    expect(response.body.message).toMatch(/Invalid event ID/i);
  });

  test("Unknown route should return 404 with standard message", async () => {
    const response = await request(app)
      .get("/api/non-existent-route");

    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBe("Route not found");
  });
});
