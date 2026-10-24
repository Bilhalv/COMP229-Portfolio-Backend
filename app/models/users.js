let mongoose = require('mongoose');

let servicesModel = mongoose.Schema(
    {
        firstname: String, 
        lastname: String,
        email: String,
        password: String,
        created: Date,
        updated: Date 
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