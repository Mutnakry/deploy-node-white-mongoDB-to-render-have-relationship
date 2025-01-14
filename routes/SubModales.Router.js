import express from 'express';
import { createSubModales,getSubModales } from '../controller/SubModales.Controller.js';


const router = express.Router();

router.post('/', createSubModales);
router.get('/', getSubModales);
export default router;

