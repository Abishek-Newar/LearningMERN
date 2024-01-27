const mongoose  = require("mongoose")

mongoose.connect("url");

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String
})


const accountSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId;
        ref: "User",
        required:true
    },
    balance: {
        type: Number,
        required: true
    }

})

const account = mongoose.model("account",accountSchema);
const User = mongoose.model("User",userSchema);

module.exports = {
    User,
    account
}