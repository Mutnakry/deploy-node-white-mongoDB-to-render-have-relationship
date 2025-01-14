import mongoose from 'mongoose';

const CoursesSchema = new mongoose.Schema({
    cat_name: { type: String, required: true },
    image_url: { type: String, required: false },
    description: { type: String, required: true },  // corrected to 'type: String'
    lesson: { type: String, required: true },       // corrected to 'type: String'
    chapter: { type: String, required: true },      // corrected to 'type: String'
    status: { type: String, enum: ['off', 'no'], required: true },  // using enum for 'status'
    document: { type: String, required: true },     // added 'required' for consistency
    exam: { type: String, required: true },         // added 'required' for consistency
    course_type: { type: String, enum: ['free', 'premium'], required: true },  // using enum for 'course_type'
});

// Create the model based on the schema
const Courses = mongoose.model('courses', CoursesSchema);

export default Courses;
