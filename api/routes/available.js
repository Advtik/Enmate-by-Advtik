import express from "express";
import {getAvailable} from "../controllers/available.js";

const router=express.Router();
router.get("/", getAvailable);

export default router;