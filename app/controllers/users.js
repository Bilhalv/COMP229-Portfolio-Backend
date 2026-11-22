let UsersModel = require('../models/users');
let createError = require('http-errors');

function sanitizeUser(doc) {
    if (!doc) return doc;
    const obj = doc.toJSON ? doc.toJSON() : { ...doc };
    delete obj.password;
    return obj;
}

module.exports.usersList = async function (req, res, next) {
    try {
        let list = await UsersModel.find({}).select('-password');
        res.json({
            success: true,
            message: "Users list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.getByID = async function (req, res, next) {
    try {
        let user = await UsersModel.findById(req.params.id).select('-password');
        if (!user) return next(createError(404, 'User not found.'));

        res.json({
            success: true,
            message: "User retrieved successfully.",
            data: user
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.userAdd = async function (req, res, next) {
    try {
        let payload = { ...req.body };
        const now = new Date();
        payload.created = payload.created ? new Date(payload.created) : now;
        payload.updated = now;

        let result = await UsersModel.create(payload);
        console.log(result);

        res.status(201).json({
            success: true,
            message: "User added successfully.",
            data: sanitizeUser(result)
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.userEdit = async function (req, res, next) {
    try {
        let userId = req.params.id;
        let updatedUser = { ...req.body };

        if (!updatedUser.password) {
            delete updatedUser.password;
        }

        updatedUser.updated = new Date();
        delete updatedUser._id;
        delete updatedUser.created;

        let result = await UsersModel.findByIdAndUpdate(userId, updatedUser, {
            new: true,
            runValidators: true,
            context: 'query'
        }).select('-password');

        if (!result) return next(createError(404, 'User not found.'));
        console.log(result);

        res.json({
            success: true,
            message: "User updated successfully.",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports.userDelete = async function (req, res, next) {
    try {
        let result = await UsersModel.findByIdAndDelete(req.params.id);
        if (!result) return next(createError(404, 'User not found.'));
        console.log(result);

        res.json({
            success: true,
            message: "User deleted successfully."
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};
