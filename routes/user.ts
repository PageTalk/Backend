import express from "express";
const router = express.Router();

import {
  createUser,
  loginUser,
  getAllUsers,
  getNamedUsers,
  updateUser
} from "../controllers/user";

router.route("/get").get(getAllUsers);
router.route("/:username").get(getNamedUsers).post(createUser).patch(updateUser);
router.route("/login").post(loginUser);

export default router;

// TODO: Add User routes
