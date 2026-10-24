let ReferencesModel = require('../models/references');

// GET api/references get all references

module.exports.referencesList = async function (req, res, next) {
    try {
        let list = await ReferencesModel.find({});

        res.json({
            success: true,
            message: "References list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

// GET api/references/:id get references by id

module.exports.getByID = async function (req, res, next) {

    try {
        let referenceId = req.params.id;
        let reference = await ReferencesModel.findOne({ _id: referenceId });

        res.json({
            success: true,
            message: "Reference retrieved successfully.",
            data: reference
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

// POST api/references add new contact

module.exports.referenceAdd = async function (req, res, next) {
    try {
        let newReference = ReferencesModel(req.body);

        let result = await ReferencesModel.create(newReference);
        console.log(result);

        res.json(
            {
                success: true,
                message: "Reference added successfully.",
                data: result
            }
        );

    } catch (error) {
        next(error);
    }
};

// PUT api/references/:id update contact by id

module.exports.referenceEdit = async function (req, res, next) {

    try {
        let referenceId = req.params.id;
        let updatedReference = ReferencesModel(req.body);
        updatedReference._id = referenceId;

        let result = await ReferencesModel.updateOne({ _id: referenceId }, updatedReference);
        console.log(result);

        res.json({
            success: true,
            message: "Reference updated successfully.",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// DELETE api/references/:id remove contact by id

module.exports.referenceDelete = async function (req, res, next) {

    try {
        let referenceId = req.params.id;
        let result = await ReferencesModel.deleteOne({ _id: referenceId });
        console.log(result);

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: "Reference deleted successfully."
            });
        }
        else {
            // Express will catch this on its own.
            throw new Error('Reference not deleted. Are you sure it exists?')
        }

    } catch (error) {
        console.log(error);
        next(error);
    }

}
