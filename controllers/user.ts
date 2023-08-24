import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { queryDatabase } from "../database/connection";

/*
  Create user ✅
  Login with user ✅
  Get user
  Get Multiple users
  Update user
  Delete user
*/

export const createUser = async (req: Request, res: Response) => {
  try {
    const { 
      username, 
      first_name, 
      last_name, 
      email, 
      password, 
      role, 
      phone 
    } = req.body;

    const retrieveUserQuery = `SELECT *
    FROM users
    WHERE email = ?`;

    let retrieveUser = await queryDatabase(retrieveUserQuery, [email]);

    if (retrieveUser.length !== 0) {
      return res.status(400).json({
        status: false,
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

    return res.status(200).json({
      status: true,
      message: "User created successfully",
      authToken: authToken,
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Some error occured while creating a user",
      error: error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const getUserQuery = `SELECT *
		FROM users 
		WHERE username = ?`;

    let retrievedUserArray = await queryDatabase(getUserQuery, [username]);

    if (!retrievedUserArray || retrievedUserArray.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No such user found",
      });
    }

    const retrievedUser = retrievedUserArray[0];

    const passwordCompare = await bcrypt.compare(
      password,
      retrievedUser.password
    );

    if (!passwordCompare) {
      return res.status(401).json({
        status: false,
        message: "Login with correct password",
      });
    }

    const payloadData = {
      id: retrievedUser.id,
      username: retrievedUser.username,
      email: retrievedUser.email,
    };

    // Creating a JWT token
    const authToken = jwt.sign(payloadData, process.env.JWT_SECRET!);

    return res.status(201).json({
      status: true,
      message: "User Login successful",
      authToken: authToken,
    });

  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Some error occured",
      error: error,
    });
  }
};

// =================== SAMPLE QUERIES ===================

// sample function to get all users
export const getAllUsers = async (req: Request, res: Response) => {
  // console.log(req.body)
  try {
    const query = "SELECT * FROM users";

    const results = await queryDatabase(query);
    return res.status(200).json({
      status: true,
      results: results.length,
      data: {
        users: results,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Some error occured",
      error: error,
    });
  }
};

// sample function to test named params
export const getNamedUsers = async (req: Request, res: Response) => {
  try {
    const query = "SELECT * FROM users WHERE first_name = ?";
    const results = await queryDatabase(query, [req.params.name]);
    return res.status(200).json({
      status: true,
      results: results.length,
      data: {
        users: results,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Some error occured",
      error: error,
    });
  }
};
