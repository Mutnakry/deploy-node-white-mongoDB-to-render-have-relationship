 import mongoose from 'mongoose';

const CoursesSchema = new mongoose.Schema({
    cat_name: { type: String, required: true },
    image_url: { type: String, required: false },
    detail: { type: String, required: false },
});

const Courses = mongoose.model('courses', CoursesSchema);

export default Courses; // Export as default
