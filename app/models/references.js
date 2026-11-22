let mongoose = require('mongoose');

let referencesModel = mongoose.Schema(
    {
        name: { type: String, required: [true, 'Name is required.'], trim: true },
        testimonial: { type: String, required: [true, 'Testimonial is required.'], trim: true },
        position: { type: String, required: [true, 'Position is required.'], trim: true },
        company: { type: String, required: [true, 'Company is required.'], trim: true }
    },
    {
        collection: "references"
    }
);

// Ensure virtual fields are serialised.
referencesModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});


module.exports = mongoose.model("References", referencesModel);