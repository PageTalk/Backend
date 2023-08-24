import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { queryDatabase } from "../database/connection";

