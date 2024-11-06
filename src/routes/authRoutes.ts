import express from "express";
import {
  signInController,
  signupController,
} from "../controller/authControllers";

const router = express.Router();

router.post("/signup", signupController);
router.post("/signin", signInController);

export default router;
