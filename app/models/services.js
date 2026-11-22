let mongoose = require('mongoose');

let servicesModel = mongoose.Schema(
    {
        title: { type: String, required: [true, 'Title is required.'], trim: true },
        description: { type: String, required: [true, 'Description is required.'], trim: true },
        tags: { type: [String], default: [] }
    },
    {
        collection: "services"
    }
);

// Ensure virtual fields are serialised.
servicesModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});


module.exports = mongoose.model("Services", servicesModel);