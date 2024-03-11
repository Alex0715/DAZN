import mongoose from "mongoose";

// Define schema for movies collection
const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genre: { type: String, required: true },
  streamLink: { type: String },
  rating: { type: Number, min: 0, max: 10 },
});

// Create a model based on the schema
export const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
