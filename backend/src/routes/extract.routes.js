import express from "express";
import { extractActionItems } from "../controllers/extract.controller.js";

const router = express.Router();

router.post("/", extractActionItems);

export default router;