const mongoose  = require("mongoose")

mongoose.connect("url")
.then(()=>{
    console.log("mogoDb connected")
})

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String
})


const accountSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    balance: {
        type: Number,
        required: true
    }

})

const account = mongoose.model("accout",accountSchema);
const User = mongoose.model("User",userSchema);

module.exports = {
    User,
    account
}