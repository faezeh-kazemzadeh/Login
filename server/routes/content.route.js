import express from "express";
import { add, getAll } from "../controller/content.controller.js";
const router = express.Router()


router.post('/add',add)
router.get('/getAll',getAll)

export default router;