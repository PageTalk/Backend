import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import mysql from "mysql";
import express from "express";
// import queryDatabase from "./database/connection";

import UserRouter from "./routes/user";
import AdminRouter from "./routes/admin";
import QueryRouter from "./routes/query";
import PdfRouter from "./routes/pdf";
import InteractionRouter from "./routes/interaction";
import CollectionRouter from "./routes/collection";

const app = express();

const port = process.env.PORT || 3000;

// Routes

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/admin", AdminRouter);
app.use("/api/v1/query", QueryRouter);
app.use("/api/v1/pdf", PdfRouter);
app.use("/api/v1/interaction", InteractionRouter);
app.use("/api/v1/collection", CollectionRouter);

// Starting Server
const start = async () => {
  try {
    const connection = mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "1234",
      database: "PageTalk",
    });
    await connection.connect((err: Error) => {
      if (err) {
        console.error("Error connecting to MySQL:", err);
        return;
      }
      console.log("Connected to MySQL!");
    });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
