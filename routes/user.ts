import express from "express";
const router = express.Router();

import { createUser, getAllUsers, getNamedUsers } from "../controllers/user";

router.route("/create").post(createUser);
router.route("/get").get(getAllUsers);
router.route("/:name").get(getNamedUsers);
router.route("/create").post(createUser);

export default router;

// TODO: Add User routes
