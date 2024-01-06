import express from "express";
import { add ,getAll , update , remove } from "../controller/product.controller.js";
import { verifyToken , authorize} from '../utils/verifyUser.js';

const router = express.Router()

router.get('/getAll',getAll)
router.post('/add',verifyToken,authorize(['Admin']),add)
router.post('/update',verifyToken,authorize(['Admin']),update)
router.delete('/remove/:id',verifyToken,authorize(['Admin']),remove)


export default router;