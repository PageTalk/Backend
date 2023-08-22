import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { queryDatabase } from "../database/connection";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { username, first_name, last_name, email, password, role, phone } =
      req.body;

    const retrieveUserQuery = `SELECT *
    FROM users
    WHERE email = ?`;

    let retrieveUser = await queryDatabase(retrieveUserQuery, [email]);

    if (retrieveUser.length !== 0) {
      return res.status(400).json({
        success: false,
        message: "Sorry the user with the given email already exists",
      });
    }

    // Hashing the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const securedPassword = await bcrypt.hash(password, salt);

    const createUserQuery = `INSERT INTO users 
    (username, first_name, last_name, email, password, role, phone)
    VALUES 
      ('${username}' , '${first_name}', '${last_name}', '${email}', '${securedPassword}', '${role}', '${phone}');`;

    // const createUser = await queryDatabase(createUserQuery);
    queryDatabase(createUserQuery);

    const createdUser = await queryDatabase(
      `SELECT * FROM users WHERE username = '${username}'`
    );

    const payloadData = {
      id: createdUser[0].id,
      username: createdUser[0].username,
      email: createdUser[0].email,
    };

    // Creating a JWT token
    const authToken = jwt.sign(payloadData, process.env.JWT_SECRET!);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      authToken: authToken,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured while creating a user",
      success: "false",
      error: error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  
}






// sample function to get all users
export const getAllUsers = async (req: Request, res: Response) => {
  // console.log(req.body)
  try {
    const query = "SELECT * FROM users";

    const results = await queryDatabase(query);
    res.status(200).json({
      status: "success",
      results: results.length,
      data: {
        users: results,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      success: "false",
      error: error,
    });
  }
};

// sample function to test named params
export const getNamedUsers = async (req: Request, res: Response) => {
  try {
    const query = "SELECT * FROM users WHERE first_name = ?";
    const results = await queryDatabase(query, [req.params.name]);
    res.status(200).json({
      status: "success",
      results: results.length,
      data: {
        users: results,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      success: "false",
      error: error,
    });
  }
};
