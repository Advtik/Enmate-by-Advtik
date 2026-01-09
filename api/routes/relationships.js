import express from "express";
import {getrelationships} from "../controllers/relationships.js";
import {addrelationships,deleterelationships} from "../controllers/relationships.js";

const router=express.Router();
router.get("/", getrelationships);
router.post("/",addrelationships);
router.delete("/",deleterelationships);

export default router;