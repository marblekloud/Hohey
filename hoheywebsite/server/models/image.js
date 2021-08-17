const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    caption: {
        required: true,
        type: String,
    },
    filename: {
        required: true,
        type: String,
    },
    fileId: {
        required: true,
        type: String,
    },
    createdAt: {
        default: () => new Date(+new Date() + 8*60*60*1000),
        type: Date,
    },
});

const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;