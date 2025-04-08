import request from "supertest";

import app from "../app.ts";
import { describe, it } from "node:test";

describe("app", () => {
  it("responds with a not found message", (done) => {
    request(app)
      .get("/what-is-this-even")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(404, done);
  });
});

describe("GET /", () => {
  it("responds with a json message", (done) => {
    request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, { message: "welcome to v1 api" })
      .expect(done);
  });
});
