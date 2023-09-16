import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Request, Response } from "express";
import { queryDatabase } from "../database/connection";

export const sendQuery = async (req: Request, res: Response) => {
    try {
        const { username, pdfID } = req.params;
        // const { title, description } = req.body;
        const getUserQuery = `SELECT * FROM users WHERE username = '${username}'`;

        const userArray = await queryDatabase(getUserQuery);
        if (!userArray || userArray.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No such user exists",
            });
        }

        const user_id = userArray[0].id;

        const verifyPDFQuery = `SELECT * FROM pdf WHERE pdf.pdf_id = ${pdfID} AND pdf.fk_user_id = '${user_id}'`;
        const pdfArray = await queryDatabase(verifyPDFQuery);
        if (!pdfArray || pdfArray.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No such PDF exists",
            });
        }

        const pdf_id = pdfArray[0].pdf_id;

        const { query_text } = req.body;
        const insertQuery = `SELECT InsertQueryAndGetID (${user_id}, ${pdf_id}, '${query_text}')`;
        const queryArray = await queryDatabase(insertQuery);

        return res.status(200).json({
            status: true,
            message: "Query sent successfully",
            query_number: Object.values(queryArray[0])[0],
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const getAllQueriesbyUsername = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const getQuerybyID = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const updateQuery = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const deleteQuery = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

// Admin function(s)

export const getAllQueries = async (req: Request, res: Response) => {
    try {
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};
