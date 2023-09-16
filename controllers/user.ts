import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { queryDatabase } from "../database/connection";

/*
  Create user ✅
  Login with user ✅
  Get user (by username) ✅
  Get all users ✅
  Update user
  Delete user
*/

export const createUser = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;

        // Check if username already exists
        let retrieveUserQuery = `SELECT *
            FROM users
            WHERE username = '${username}'`;
        let retrieveUser = await queryDatabase(retrieveUserQuery);
        if (retrieveUser.length !== 0) {
            return res.status(400).json({
                status: false,
                message: "Sorry the username has been taken",
            });
        }

        const { first_name, last_name, role, phone, email, password } =
            req.body;

        // Check if the email is associated with a different username
        retrieveUserQuery = `SELECT *
            FROM users
            WHERE email = '${email}'`;
        let retrieveUser2 = await queryDatabase(retrieveUserQuery);
        if (retrieveUser2.length !== 0) {
            return res.status(400).json({
                status: false,
                message:
                    "Sorry, the email is associated with a different username",
            });
        }

        // Hashing the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(password, salt);

        const createUserQuery = `SELECT InsertUserAndGetID ('${username}' , '${first_name}', '${last_name}', '${email}', '${securedPassword}', '${role}', '${phone}');`;

        // const createUser = await queryDatabase(createUserQuery);
        const createUserQueryArray = await queryDatabase(createUserQuery);
        const user_id = Object.values(createUserQueryArray[0])[0];

        const payloadData = {
            id: user_id,
            username,
            email
        };

        // Creating a JWT token
        const authToken = jwt.sign(payloadData, process.env.JWT_SECRET!);

        return res.status(201).json({
            status: true,
            message: "User created successfully",
            authToken: authToken,
            user_id
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
		WHERE username = '${username}'`;

        let retrievedUserArray = await queryDatabase(getUserQuery);

        if (!retrievedUserArray || retrievedUserArray.length === 0) {
            return res.status(400).json({
                status: false,
                message: "No such user found",
            });
        }

        const retrievedUser = retrievedUserArray[0];

        const updateLoginQuery = `UPDATE users
    SET last_login = NOW()
    WHERE username = '${retrievedUser.username}';`;

        queryDatabase(updateLoginQuery);

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

export const updateUser = async (req: Request, res: Response) => {
    try {
        const username = req.params.username;

        const getUserQuery = `SELECT *
		FROM users 
		WHERE username = ${username}`;

        let retrievedUserArray = await queryDatabase(getUserQuery);

        if (!retrievedUserArray || retrievedUserArray.length === 0) {
            return res.status(400).json({
                status: false,
                message: "No such user found",
            });
        }

        let { first_name, last_name, role, phone, email, password } = req.body;

        first_name = first_name ? `'${first_name}'` : "NULL";
        last_name = last_name ? `'${last_name}'` : "NULL";
        role = role ? `'${role}'` : "NULL";
        phone = phone ? `'${phone}'` : "NULL";
        email = email ? `'${email}'` : "NULL";
        password = password ? `'${password}'` : "NULL";

        const updateUserQuery = `UPDATE users
    SET first_name = COALESCE(${first_name}, first_name)
    SET last_name = COALESCE(${last_name}, last_name)
    SET role = COALESCE(${role}, role)
    SET phone = COALESCE(${phone}, phone)
    SET email = COALESCE(${email}, email)
    SET password = COALESCE(${password}, password)
    WHERE username = ${username};
    `;

        const updatedUserArray = await queryDatabase(updateUserQuery);
        const updatedUser = updatedUserArray[0];

        return res.status(200).json({
            updatedUser: updatedUser,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const query = `SELECT * FROM users WHERE username = '${req.params.username}'`;
        const result = await queryDatabase(query);
        // console.log(result);
        return res.status(200).json({
            status: true,
            results: result.length,
            data: {
                users: result,
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
