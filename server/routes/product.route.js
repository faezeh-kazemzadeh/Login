import express from "express";
import { addProduct ,getAll } from "../controller/product.controller.js";
import { verifyToken , authorize} from '../utils/verifyUser.js';

const router = express.Router()

router.get('/getAll',getAll)
router.post('/add',verifyToken,authorize(['Admin']),addProduct)


export default router;