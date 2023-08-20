import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file

import express from "express";
import queryDatabase from "./database/connection";

import UserRouter from './routes/user';
import AdminRouter from './routes/admin';
import QueryRouter from './routes/query';
import PdfRouter from './routes/pdf';
import InteractionRouter from './routes/interaction';
import CollectionRouter from './routes/collection';

const app = express();

const port = process.env.PORT || 3000;

// Routes

app.use('/api/v1/user', UserRouter);
app.use('/api/v1/admin', AdminRouter);
app.use('/api/v1/query', QueryRouter);
app.use('/api/v1/pdf', PdfRouter);
app.use('/api/v1/interaction', InteractionRouter);
app.use('/api/v1/collection', CollectionRouter);

// Starting Server
const start = async () => {
  try {
    await queryDatabase("SELECT 1"); // A simple query to test the connection
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
