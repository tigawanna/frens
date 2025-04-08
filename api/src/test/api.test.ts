import request from "supertest";
import app from "@/app.ts";
import { describe, it } from "node:test";

describe("GET /api/v1", () => {
  it("responds with a json message", async (done) => {
    await request(app)
      .get("/api/v1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, { message: "welcome to v1 api" })
      .expect(done);
  });
});
