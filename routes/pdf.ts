import express from "express";
const router = express.Router();

import {
    uploadPDF,
} from "../controllers/pdf";

router.route('/:username/upload').post(uploadPDF);

export default router;

// TODO: Add PDF routes