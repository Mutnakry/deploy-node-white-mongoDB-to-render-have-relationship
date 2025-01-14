import express from 'express';
import { createModales,getModales,getModalesById,updateModales,deleteModales,getModalesBYcoursesID } from '../controller/Modales.Controller.js';


const router = express.Router();

router.post('/', createModales);
router.get('/', getModales);
router.get('/:id', getModalesBYcoursesID);
router.get('/modal:id', getModalesById);
router.put('/:id', updateModales);
router.delete('/:id', deleteModales);
export default router;

