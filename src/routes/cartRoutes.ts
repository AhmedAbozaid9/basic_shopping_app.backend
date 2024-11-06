import express, { RequestHandler } from "express";

import requireAuth from "../middlewares/requireAuth";
import { getCart } from "../controller/cartController";

const router = express.Router();

router.use(requireAuth as RequestHandler);

router.get("/", getCart);

export default router;
