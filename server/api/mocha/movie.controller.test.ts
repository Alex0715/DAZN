const request = require("supertest");
const express = require("express");
const app = express(); // Assuming your Express app is exported from 'app.js' or similar
// import jest from "jest";

describe("Movie Routes", () => {
  test("POST /movies should add a new movie", async () => {
    const response = await request(app).post("/movies").send({
      name: "Titanic",
      streamLink: "www.stream.com",
      genre: "romance",
      rating: 9.4,
    });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe(false);
    expect(response.body.message).toBe("Movie Added");
  });

  // Add more test cases for other routes as needed
});
