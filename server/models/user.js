const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    OnlineMai: { 
        required: true,
        type: Number,
    },
    MMaccount: {
        required: true,
        type: String ,
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;