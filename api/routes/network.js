import express from "express";
import {getNetwork} from "../controllers/network.js";

const router=express.Router();
router.get("/", getNetwork);

export default router;