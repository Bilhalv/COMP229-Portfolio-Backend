let mongoose = require('mongoose');

let usersModel = mongoose.Schema(
    {
        firstname: { type: String, required: [true, 'First name is required.'], trim: true },
        lastname: { type: String, required: [true, 'Last name is required.'], trim: true },
        email: { type: String, required: [true, 'Email is required.'], trim: true, unique: true, lowercase: true },
        password: { type: String, required: [true, 'Password is required.'] },
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now }
    },
    {
        collection: "users"
    }
);

// Ensure virtual fields are serialised.
usersModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.password;
    }
});


module.exports = mongoose.model("Users", usersModel);