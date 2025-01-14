import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json()); 

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
import usersRoutes from './routes/usersRoutes.js'
import categoryRoute from './routes/Courses.Router.js';
import ModalesRoute from './routes/Modales.Router.js';
import SubModalesRoute from './routes/SubModales.Router.js';

app.use("/api/courses", categoryRoute);
app.use("/api/modales", ModalesRoute);
app.use('/api/users', usersRoutes);
app.use('/api/submodale', SubModalesRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(process.env.JWT_SECRET_KEY);
});


// project 2
///email=nakrymut375@gmail.com
///pass=123