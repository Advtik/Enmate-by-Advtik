import express from "express";
import { getUserConversations } from "../controllers/chats.js";

const router=express.Router();
router.get("/", getUserConversations);

export default router;