import express from "express";
import { getOrCreateConversation } from "../controllers/conversation.js";

const router=express.Router();
router.get("/:userId",getOrCreateConversation);

export default router;