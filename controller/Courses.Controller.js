import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import Courses from '../modals/Courses.js';  // Use Courses model instead of Category

// Get the current directory path using fileURLToPath and import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a new course with image upload
const createCourses = async (req, res) => {
    const { cat_name, detail } = req.body;
    const image_url = req.file ? `/uploads/${req.file.filename}` : null;

    const newCourses = new Courses({
        cat_name,
        image_url,
        detail,
    });

    try {
        const savedCourses = await newCourses.save();
        res.status(201).json(savedCourses);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Get all courses
const getCourses = async (req, res) => {
    try {
        const courses = await Courses.find();  // Using Courses model
        res.status(200).json(courses);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a course by ID
const getCoursesById = async (req, res) => {
    const { id } = req.params;

    try {
        const course = await Courses.findById(id);  // Using Courses model
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update a course
const updateCourses = async (req, res) => {
    const { id } = req.params;
    const { cat_name, detail } = req.body;

    let image_url = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const courseToUpdate = await Courses.findById(id);  // Using Courses model

        if (!courseToUpdate) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (image_url && courseToUpdate.image_url) {
            const oldImagePath = path.join(__dirname, '../uploads', path.basename(courseToUpdate.image_url));
            fs.unlink(oldImagePath, (err) => {
                if (err) {
                    console.error('Error deleting old image file:', err);
                } else {
                    console.log('Old image deleted:', oldImagePath);
                }
            });
        }

        const updatedCourse = await Courses.findByIdAndUpdate(
            id,
            { cat_name, detail, image_url: image_url || courseToUpdate.image_url },
            { new: true }
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json(updatedCourse);
    } catch (err) {
        console.error('Error updating course:', err);
        res.status(400).json({ message: err.message });
    }
};

// Delete a course
const deleteCourses = async (req, res) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ message: 'Invalid course ID format' });
    }

    try {
        const courseToDelete = await Courses.findById(id);

        if (!courseToDelete) {
            return res.status(404).json({ message: 'Course not found' });
        }

        if (courseToDelete.image_url) {
            const imagePath = path.join(__dirname, '../uploads', path.basename(courseToDelete.image_url));
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.error('Error deleting image file:', err);
                } else {
                    console.log('Image deleted:', imagePath);
                }
            });
        }

        const deletedCourse = await Courses.findByIdAndDelete(id);

        if (!deletedCourse) {
            return res.status(404).json({ message: 'Course not found' });
        }

        res.status(200).json({ message: 'Course and image deleted successfully', course: deletedCourse });
    } catch (err) {
        console.error('Error deleting course:', err);
        res.status(500).json({ message: err.message });
    }
};

export { createCourses, getCourses, getCoursesById, updateCourses, deleteCourses };
