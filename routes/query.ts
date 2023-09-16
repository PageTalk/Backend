import express from "express";
const router = express.Router();

import {
    sendQuery,
    getAllQueriesbyUsernameAndPDF,
    getQuerybyID,
    updateQuery,
    deleteQuery,
    getAllQueries,
} from "../controllers/query";

router
    .route("/:pdfID")
    .get(getAllQueriesbyUsernameAndPDF)
    .post(sendQuery);

router
    .route("/:queryID")
    .get(getQuerybyID)
    .patch(updateQuery)
    .delete(deleteQuery);

router.route("/").get(getAllQueries);

export default router;

// TODO: Add Query routes
