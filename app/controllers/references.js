let ReferencesModel = require('../models/references');
let createError = require('http-errors');

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
};

module.exports.getByID = async function (req, res, next) {
    try {
        let reference = await ReferencesModel.findById(req.params.id);
        if (!reference) return next(createError(404, 'Reference not found.'));
        res.json({
            success: true,
            message: "Reference retrieved successfully.",
            data: reference
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.processAdd = async function (req, res, next) {
    try {
        let result = await ReferencesModel.create(req.body);
        console.log(result);
        res.status(201).json({
            success: true,
            message: "Reference added successfully.",
            data: result
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.processEdit = async function (req, res, next) {
    try {
        let payload = { ...req.body };
        delete payload._id;
        let result = await ReferencesModel.findByIdAndUpdate(req.params.id, payload, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        if (!result) return next(createError(404, 'Reference not found.'));
        console.log(result);
        res.json({
            success: true,
            message: "Reference updated successfully."
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.performDelete = async function (req, res, next) {
    try {
        let result = await ReferencesModel.findByIdAndDelete(req.params.id);
        if (!result) return next(createError(404, 'Reference not found.'));
        console.log(result);
        res.json({
            success: true,
            message: "Reference deleted successfully."
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
