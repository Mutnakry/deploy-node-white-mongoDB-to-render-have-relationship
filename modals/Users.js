import mongoose from 'mongoose';

const CoursesSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: false },
    age: { type: String, required: true },
    gender: { type: String, enum: ['male', 'female', 'order'], required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

// Create the model based on the schema
const Courses = mongoose.model('users', CoursesSchema);

export default Courses;
