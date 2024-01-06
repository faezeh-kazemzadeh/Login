import express from "express";
import { add ,getAll , update } from "../controller/product.controller.js";
import { verifyToken , authorize} from '../utils/verifyUser.js';

const router = express.Router()

router.get('/getAll',getAll)
router.post('/add',verifyToken,authorize(['Admin']),add)
router.post('/update',verifyToken,authorize(['Admin']),update)


export default router;