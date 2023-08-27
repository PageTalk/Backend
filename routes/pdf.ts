import express from "express";
const router = express.Router();

import { uploadPDF, uploadForm } from "../controllers/pdf";

router.route("/:username/upload").get(uploadForm).post(uploadPDF);

export default router;

// TODO: Add PDF routes
