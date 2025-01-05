import mongoose from 'mongoose';

const modelesSchema = new mongoose.Schema({
    mod_name: { type: String, required: true },
    courses_id: { type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: false },
    description: { type: String, required: false },
    status: { type: String, default: 'off', enum: ['off', 'on'] }
});

const modales = mongoose.model('modales', modelesSchema);

export default modales;






