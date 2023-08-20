import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import express from "express";
const app = express();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
