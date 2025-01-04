import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
// import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());  // Parses JSON data

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 50000, // 50 seconds
})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Serve static files (images) from the 'uploads' directory
app.use('/uploads', express.static('uploads'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Import routes
import categoryRoute from './routes/Courses.Router.js';
app.use("/api/courses", categoryRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
