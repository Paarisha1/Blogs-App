import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/user-routes.js'; // Ensure the correct path and extension
import blogRouter from './routes/blogs-routes.js';
import cors from "cors";

const app = express();

app.use(cors());
// Middleware to parse JSON requests
app.use(express.json());

// Use the user router for routes starting with /api/user
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

// Directly set the MongoDB URI
const mongoUri = "mongodb+srv://admin:yk57JHtMkVJzuUWW@cluster0.hak0n3z.mongodb.net/Blog?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(5000, () => {
      console.log("Server is running on port 5000 and connected to database");
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });