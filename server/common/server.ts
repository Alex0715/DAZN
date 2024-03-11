import http from "http";
import express, { Application } from "express";
import bodyParser from "body-parser";
import CONFIG from "../api/config";
import os from "os";
import cors from "cors";

const Ddos = require("ddos");
const ddos = new Ddos({
  limit: 100000,
  errormessage: "You are blocked, Due to too many requests",
});

const app: any = express();
app.use(ddos.express);
app.get("/status", (req: express.Request, res: express.Response) => {
  console.log("SUCCESS");
});
export default class ExpressServer {
  constructor() {
    app.use(bodyParser.json({ limit: CONFIG.REQUEST_LIMIT || "100kb" }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: CONFIG.REQUEST_LIMIT || "100kb",
      })
    );
    app.use(cors());
  }

  router(routes: (app: Application) => void): ExpressServer {
    routes(app);
    return this;
  }

  listen(port: number): Application {
    const welcome = (p: number) => (): void =>
      console.log(
        `up and running in ${
          CONFIG.PORT || "development"
        } @: ${os.hostname()} on port: ${p}}`
      );
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
