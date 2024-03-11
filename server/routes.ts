import express, { Application } from "express";
import UserRouter from "./api/controllers/movies/router";

export default function routes(app: Application): void {
  app.use("/movies", UserRouter);
}
