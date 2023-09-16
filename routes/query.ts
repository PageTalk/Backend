import express from "express";
const router = express.Router();

import {
    sendQuery,
    getAllQueriesbyUsername,
    getQuerybyID,
    updateQuery,
    deleteQuery,
    getAllQueries
} from "../controllers/query";

router.route("/:username/:pdfID").get(getAllQueriesbyUsername).patch(updateQuery).post(sendQuery).delete(deleteQuery);
router.route("/:username/:id").get(getQuerybyID);
router.route("/").get(getAllQueries);

export default router;

// TODO: Add Query routes
