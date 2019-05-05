const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DocumentSchema = new Schema({
    name: {
        type: String,
    },
    text: {
        type: String
    },
    updatedAt: {
        type: Date
    }
});
const DocumentModel = mongoose.model('documents', DocumentSchema);
module.exports = DocumentModel;
