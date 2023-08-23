import express from "express";
const router = express.Router();

import {
  createUser,
  loginUser,
  getAllUsers,
  getNamedUsers,
} from "../controllers/user";

router.route("/get").get(getAllUsers);
router.route("/:name").get(getNamedUsers);
router.route("/create").post(createUser);
router.route("/login").post(loginUser);

export default router;

// TODO: Add User routes
