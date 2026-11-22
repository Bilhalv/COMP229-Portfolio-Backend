let ServicesModel = require('../models/services');
let createError = require('http-errors');

module.exports.servicesList = async function (req, res, next) {
    try {
        let list = await ServicesModel.find({});
        res.json({
            success: true,
            message: "Services list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.getByID = async function (req, res, next) {
    try {
        let service = await ServicesModel.findById(req.params.id);
        if (!service) return next(createError(404, 'Service not found.'));
        res.json({
            success: true,
            message: "Service retrieved successfully.",
            data: service
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.serviceAdd = module.exports.processAdd = async function (req, res, next) {
    try {
        let result = await ServicesModel.create(req.body);
        console.log(result);
        res.status(201).json({
            success: true,
            message: "Service added successfully.",
            data: result
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.serviceEdit = module.exports.processEdit = async function (req, res, next) {
    try {
        let payload = { ...req.body };
        delete payload._id;
        let result = await ServicesModel.findByIdAndUpdate(req.params.id, payload, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        if (!result) return next(createError(404, 'Service not found.'));
        console.log(result);
        res.json({
            success: true,
            message: "Service updated successfully."
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.serviceDelete = module.exports.performDelete = async function (req, res, next) {
    try {
        let result = await ServicesModel.findByIdAndDelete(req.params.id);
        if (!result) return next(createError(404, 'Service not found.'));
        console.log(result);
        res.json({
            success: true,
            message: "Service deleted successfully."
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
