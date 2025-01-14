import mongoose from 'mongoose';

const submodelesSchema = new mongoose.Schema({
    sub_name: { type: String, required: true },
    courses_id: { type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: false },
    modales_id: { type: mongoose.Schema.Types.ObjectId, ref: 'modales', required: false },
    user_at: { type: String, required: false },
    user_update: { type: String, required: false },
});

const sub_modales = mongoose.model('sub_modales', submodelesSchema);

export default sub_modales;

