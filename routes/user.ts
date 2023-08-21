import express from "express";
const router = express.Router();

import { createUser, getAllUsers } from "../controllers/user";

router.route("/create").post(createUser);
router.route("/get").get(getAllUsers);

export default router;

// TODO: Add User routes
