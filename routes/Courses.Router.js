import express from 'express';
import upload from '../config/multerConfig.js'; 
import { createCourses, getCourses, getCoursesById, updateCourses, deleteCourses } from '../controller/Courses.Controller.js';


const router = express.Router();
router.post('/', upload.single('image'), createCourses);
router.get('/', getCourses);
router.get('/:id', getCoursesById);
router.put('/:id', upload.single('image'), updateCourses);
router.delete('/:id', deleteCourses);

export default router;


