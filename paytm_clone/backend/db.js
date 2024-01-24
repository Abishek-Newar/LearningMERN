const mongoose = require("mongoose");

mongoose.connect("url");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
        
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 30,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const User = mongoose.model("User", UserSchema);
const account = mongoose.model("accout", accountSchema);

module.exports = {
    User,
    account
}


