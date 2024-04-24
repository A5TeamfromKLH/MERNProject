import express from "express";
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from "cookie-parser";
import tourRoute from './routes/tours.js';
import userRoute from './routes/users.js';
import authRoute from './routes/auth.js';
import reviewRoute from './routes/reviews.js';
import bookingRoute from './routes/bookings.js';

// let dotenv = require("dotenv");

dotenv.config();


const app = express();
const port = process.env.MONGO_URI || 5000;
const corsOptions = {
   origin: true,
   credentials: true
};


mongoose.set("strictQuery", false);


async function connectToDB() {
   try {
      await mongoose.connect("mongodb+srv://nanishashi173:nani@cluster0.6osqjnj.mongodb.net/test", {
         useNewUrlParser: true,
         useUnifiedTopology: true
      });
      console.log('MongoDB connected');
   } catch (error) {
      console.error('MongoDB connection failed:', error);
      process.exit(1); 
   }
}


app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);

// Start the server
app.listen(port, async () => {
   try {
      await connectToDB();
      console.log('Server listening on port', port);
   } catch (error) {
      console.error('Error starting server:', error);
   }
});
