let UsersModel = require('../models/users');

// GET api/users get all users

module.exports.usersList = async function (req, res, next) {
    try {
        let list = await UsersModel.find({});

        res.json({
            success: true,
            message: "Users list retrieved successfully.",
            data: list
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

// GET api/users/:id get users by id

module.exports.getByID = async function (req, res, next) {

    try {
        let userId = req.params.id;
        let user = await UsersModel.findOne({ _id: userId });

        res.json({
            success: true,
            message: "User retrieved successfully.",
            data: user
        });
    } catch (error) {
        console.log(error);
        next(error);
    }

}

// POST api/users add new user

module.exports.userAdd = async function (req, res, next) {
    try {
        let newUser = UsersModel(req.body);

        let result = await UsersModel.create(newUser);
        console.log(result);

        res.json(
            {
                success: true,
                message: "User added successfully.",
                data: result
            }
        );

    } catch (error) {
        next(error);
    }
};

// PUT api/users/:id update user by id

module.exports.userEdit = async function (req, res, next) {

    try {
        let userId = req.params.id;
        let updatedUser = UsersModel(req.body);
        updatedUser._id = userId;

        let result = await UsersModel.updateOne({ _id: userId }, updatedUser);
        console.log(result);

        res.json({
            success: true,
            message: "User updated successfully.",
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
}

// DELETE api/users/:id remove user by id

module.exports.userDelete = async function (req, res, next) {

    try {
        let userId = req.params.id;
        let result = await UsersModel.deleteOne({ _id: userId });
        console.log(result);

        if (result.deletedCount > 0) {
            res.json({
                success: true,
                message: "User deleted successfully."
            });
        }
        else {
            // Express will catch this on its own.
            throw new Error('User not deleted. Are you sure it exists?')
        }

    } catch (error) {
        console.log(error);
        next(error);
    }

}
