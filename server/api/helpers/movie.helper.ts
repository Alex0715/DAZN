import { promisify } from "util";
import Movie from "../models/movie.schema";
import * as redis from "redis";

const options = {
  host: "localhost",
  port: 6379,
};

const redisClient = redis.createClient({
  url: "redis://localhost:6379",
  legacyMode: true,
});
redisClient.on("connect", () => {
  console.log("Connected to Redis");
});
redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

const redisGetAsync = promisify(redisClient.get).bind(redisClient);
const redisSetAsync = promisify(redisClient.set).bind(redisClient);
const redisDelAsync = promisify(redisClient.del).bind(redisClient);

class MovieHelper {
  constructor() {
    this.connectRedisClient();
  }
  private async connectRedisClient() {
    await redisClient.connect();
  }
  addMovie = async (data: any) => {
    try {
      const newMovie = new Movie(data);
      const addMovie = await newMovie.save();
      if (addMovie) {
        await redisSetAsync(`movie:${addMovie._id}`, JSON.stringify(addMovie));
        return {
          error: false,
          message: "Movie Added",
        };
      }
      return {
        error: true,
        message: "Error While adding Movie",
      };
    } catch (error: any) {
      console.log(error, "ERROR WHILE ADDING MOVIES");
      return {
        error: true,
        message: "Error While adding Movie",
      };
    }
  };

  getAll = async (limit: number, offset: number) => {
    try {
      const getAll = await Movie.find().limit(limit).skip(offset);
      if (getAll) {
        return {
          error: false,
          data: getAll,
        };
      }
      return {
        error: true,
        message: "No Movies Found",
      };
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  };

  search = async (query: string) => {
    try {
      const cachedResults = await redisGetAsync(`search:${query}`);
      if (cachedResults) {
        console.log("Search results retrieved from Redis cache");
        return {
          error: false,
          data: JSON.parse(cachedResults),
        };
      }

      const search = await Movie.find({
        $or: [
          { name: { $regex: query, $options: "i" } }, // Case-insensitive search for title
          { genre: { $regex: query, $options: "i" } }, // Case-insensitive search for genre
        ],
      });
      if (search) {
        await redisSetAsync(
          `search:${query}`,
          JSON.stringify(search),
          "EX",
          60
        );
        return {
          error: false,
          data: search,
        };
      }
      return {
        error: true,
        message: "No Movies Found",
      };
    } catch (error: any) {
      return {
        error: true,
        message: error.message,
      };
    }
  };

  updateMovie = async (id: any, dataToUpdate: any) => {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(id, dataToUpdate);
      if (updatedMovie) {
        await redisSetAsync(
          `movie:${updatedMovie._id}`,
          JSON.stringify(updatedMovie)
        );
        return {
          error: false,
          message: "Movie Updated",
          updatedMovie: updatedMovie,
        };
      }
      return {
        error: true,
        message: "Movie not found",
      };
    } catch (error: any) {
      console.log(error, "ERROR WHILE UPDATING MOVIE");
      return {
        error: true,
        message: "Error while updating Movie",
      };
    }
  };

  deleteMovie = async (id: any) => {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(id);
      if (deletedMovie) {
        await redisDelAsync(`movie:${id}`);
        return {
          error: false,
          message: "Movie Deleted",
        };
      }
      return {
        error: true,
        message: "Movie not found",
      };
    } catch (error: any) {
      console.log(error, "ERROR WHILE DELETING MOVIE");
      return {
        error: true,
        message: "Error while deleting Movie",
      };
    }
  };
}

export default new MovieHelper();
