import * as dotenv from "dotenv";
dotenv.config(); // Load environment variables from .env file
import { Request, Response } from "express";
import { queryDatabase } from "../database/connection";

export const sendQuery = async (req: Request, res: Response) => {};

export const getAllQueriesbyUsername = async (
    req: Request,
    res: Response
) => {
    try {
        
    }  catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const getQuerybyID = async (req: Request, res: Response) => {
    try {
        
    }  catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const updateQuery = async (req: Request, res: Response) => {
    try {
        
    }  catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
};

export const deleteQuery = async (req: Request, res: Response) => {
    try {
        
    }  catch (error) {
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
        
    }  catch (error) {
        return res.status(500).json({
            status: false,
            message: "Some error occured",
            error: error,
        });
    }
}