import mongoose from "mongoose";

// MongoDB connection URL
const mongoURL = "mongodb://localhost:27017/DAZN";

// Connect to MongoDB
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true, // Use mongoose's useNewUrlParser option
    useUnifiedTopology: true,
  } as any) // Cast to 'any' to bypass TypeScript error
  .then(() => console.log("MongoDB connected"))
  .catch((err: any) => console.error("MongoDB connection error:", err));
