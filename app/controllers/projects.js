let ProjectsModel = require('../models/projects');
let createError = require('http-errors');

module.exports.projectsList = async function (req, res, next) {
    try {
        let list = await ProjectsModel.find({});
        res.json({
            success: true,
            message: "Projects list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.getByID = async function (req, res, next) {
    try {
        let project = await ProjectsModel.findById(req.params.id);
        if (!project) return next(createError(404, 'Project not found.'));
        res.json({
            success: true,
            message: "Project retrieved successfully.",
            data: project
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.processAdd = async function (req, res, next) {
    try {
        let result = await ProjectsModel.create(req.body);
        console.log(result);
        res.status(201).json({
            success: true,
            message: "Project added successfully.",
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
        let result = await ProjectsModel.findByIdAndUpdate(req.params.id, payload, {
            new: true,
            runValidators: true,
            context: 'query'
        });
        if (!result) return next(createError(404, 'Project not found.'));
        console.log(result);
        res.json({
            success: true,
            message: "Project updated successfully."
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.processDelete = module.exports.performDelete = async function (req, res, next) {
    try {
        let result = await ProjectsModel.findByIdAndDelete(req.params.id);
        if (!result) return next(createError(404, 'Project not found.'));
        console.log(result);
        res.json({
            success: true,
            message: "Project deleted successfully."
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
