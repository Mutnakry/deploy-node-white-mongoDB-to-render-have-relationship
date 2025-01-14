import Courses from "../modals/Courses.js";
import Modales from "../modals/Modale.js";
import SubModales from "../modals/SubModale.js";



export const createSubModales = async (req, res) => {
    const { sub_name, courses_id, modales_id, user_at } = req.body;

    try {
        if (courses_id) {
            const categoryExists = await Courses.findById(courses_id);
            if (!categoryExists) {
                return res.status(400).json({ message: 'Invalid category_id' });
            }
        }
        if (modales_id) {
            const categoryExists = await Modales.findById(modales_id);
            if (!categoryExists) {
                return res.status(400).json({ message: 'Invalid category_id' });
            }
        }
        const newModales = new SubModales({
            sub_name,
            courses_id,
            modales_id,
            user_at
        });

        const savedMoedale = await newModales.save();
        res.status(201).json(savedMoedale);
    } catch (err) {
        console.error('Error creating nModales:', err);
        res.status(400).json({ message: err.message });
    }
};




export const getSubModales = async (req, res) => {
    try {
        const modales = await SubModales.find().populate('courses_id').populate('modales_id');;

        res.status(200).json(modales);
    } catch (err) {
        console.error('Error fetching Modales:', err);
        res.status(500).json({ message: err.message });
    }
};

