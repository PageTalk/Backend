// import * as dotenv from "dotenv";
// dotenv.config(); // Load environment variables from .env file
// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// // import queryDatabase from "../database/connection";

// export const createUser = async (req: Request, res: Response) => {
//   const { username, first_name, last_name, email, password, role, phone } =
//     req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const getUserQuery = `
//   SELECT *
//   FROM users
//   WHERE email = $1`;

//   let retrieveUser = queryDatabase(getUserQuery, [email]);

//   console.log(retrieveUser);

//   // //Hashing the password using bcrypt
//   // const salt = await bcrypt.genSalt(10);
//   // const securedPassword = await bcrypt.hash(password, salt);

//   // const createUserQuery = `
//   // INSERT INTO
//   // `
// };

// // sample function to get all users
// export const getAllUsers = async (req: Request, res: Response) => {
//   const getAllUsersQuery = `
//   SELECT *
//   FROM users`;

//   const allUsers = await queryDatabase(getAllUsersQuery);

//   res.status(200).send(allUsers);
// };
