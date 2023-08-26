import express from "express";
const router = express.Router();

import {
  createUser,
  loginUser,
  getAllUsers,
  getNamedUsers,
  updateUser,
} from "../controllers/user";

router.route("/get").get(getAllUsers);
router.route("/login").post(loginUser);
router
  .route("/:username")
  .get(getNamedUsers)
  .post(createUser)
  .patch(updateUser);
  
export default router;

// TODO: Add User routes
