const catways = require('../models/catways');

exports.getCatwayById = async (req, res) => {
    try {
        const catway = await catways.findById(req.params.id);
        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }
        res.status(200).json(catway);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.add = async (req, res) => {
    const { catwayNumber, catwayType, catwayState } = req.body;
    try {
        const catway = new catways({ catwayNumber, catwayType, catwayState });
        await catway.save();
        res.status(201).json(catway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.update = async (req, res) => {
    const { catwayNumber, catwayType, catwayState } = req.body;
    try {
        const updatedCatway = await catways.findByIdAndUpdate(
            req.params.id,
            { catwayNumber, catwayType, catwayState },
            { new: true }
        );
        if (!updatedCatway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }
        res.status(200).json(updatedCatway);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.delete = async (req, res) => {  
    try {
        const catway = await catways.findByIdAndDelete(req.params.id);
        if (!catway) {
            return res.status(404).json({ message: 'Catway non trouvé' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
exports.getAllCatways = async (req, res) => {
    try {
        const catwaysList = await catways.find();
        res.status(200).json(catwaysList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


