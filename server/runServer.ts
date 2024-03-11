import Server from "./common/server";
import routes from "./routes";
import CONFIG from "./api/config";
import * as redis from "redis";

const options = {
  host: "localhost",
  port: 6379,
} as redis.RedisClientOptions;

const redisClient = redis.createClient(options);

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

const port: number = CONFIG.PORT;
new Server().router(routes).listen(port);
