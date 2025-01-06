import Courses from "../modals/Courses.js";
import Modales from "../modals/Modale.js";

export const createModales = async (req, res) => {
    const { mod_name, courses_id, description, status } = req.body;

    try {
        if (courses_id) {
            const categoryExists = await Courses.findById(courses_id);
            if (!categoryExists) {
                return res.status(400).json({ message: 'Invalid category_id' });
            }
        }
        const newModales = new Modales({
            mod_name,
            courses_id,
            description,
            status,
        });

        const savedMoedale = await newModales.save();
        res.status(201).json(savedMoedale);
    } catch (err) {
        console.error('Error creating nModales:', err);
        res.status(400).json({ message: err.message });
    }
};


export const getModales = async (req, res) => {
    try {
        const modales = await Modales.find().populate('courses_id');

        res.status(200).json(modales);
    } catch (err) {
        console.error('Error fetching Modales:', err);
        res.status(500).json({ message: err.message });
    }
};



export const getModales1 = async (req, res) => {
    try {
        const modales = await Modales.aggregate([
            {
                $lookup: {
                    from: 'courses', // Name of the Courses collection
                    localField: 'courses_id', // Field from Modales collection
                    foreignField: '_id', // Field from Courses collection
                    as: 'courseDetails' // Alias for the joined data
                }
            },
            {
                $unwind: '$courseDetails' // Unwind the resulting array to merge the data
            }
        ]);

        res.status(200).json(modales);
    } catch (err) {
        console.error('Error fetching Modales:', err);
        res.status(500).json({ message: err.message });
    }
};





export const getModalesById = async (req, res) => {
    const { id } = req.params;
    try {
        const modales = await Modales.findById(id);
        if (!modales) {
            return res.status(404).json({ message: 'Modales not found' });
        }
        res.status(200).json(modales);
    } catch (err) {
        console.error('Error fetching Modales by ID:', err);
        res.status(500).json({ message: err.message });
    }
};


export const updateModales = async (req, res) => {
    const { id } = req.params;
    const { mod_name, courses_id, description, status } = req.body;
    try {
        const updatedModales = await Modales.findByIdAndUpdate(
            id,
            { mod_name, courses_id, description, status },
            { new: true, runValidators: true }
        );
        if (!updatedModales) {
            return res.status(404).json({ message: 'Modales not found' });
        }
        res.status(200).json(updatedModales);
    } catch (err) {
        console.error('Error updating Modales:', err);
        res.status(400).json({ message: err.message });
    }
};


export const deleteModales = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedModales = await Modales.findByIdAndDelete(id);
        if (!deletedModales) {
            return res.status(404).json({ message: 'Modales not found' });
        }
        res.status(200).json({ message: 'Modales deleted successfully' });
    } catch (err) {
        console.error('Error deleting Modales:', err);
        res.status(500).json({ message: err.message });
    }
};


