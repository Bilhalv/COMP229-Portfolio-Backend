let mongoose = require('mongoose');

let projectsModel = mongoose.Schema(
    {
        name: { type: String, required: [true, 'Name is required.'], trim: true },
        completionDate: { type: Date, required: [true, 'Completion date is required.'] },
        description: { type: String, required: [true, 'Description is required.'], trim: true },
        image: { type: String, default: '' },
        role: { type: String, required: [true, 'Role is required.'], trim: true },
        stack: { type: [String], default: [] },
        repoUrl: { type: String, required: [true, 'Repository URL is required.'], trim: true },
        hasEnglishDescription: { type: Boolean, default: false }
    },
    {
        collection: "projects"
    }
);

// Ensure virtual fields are serialised.
projectsModel.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id
    }
});


module.exports = mongoose.model("Projects", projectsModel);