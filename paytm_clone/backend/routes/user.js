const express = require("express");
const jwt = require("jsonwebtoken");
const {User, account} = require("../db")
const zod = require("zod");
const userRouter = express.Router();
const JWT_TOKEN = require("../config");
const { authMiddleware } = require("../middlewares/authMiddleware");

const signUp = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string().email(),
    password: zod.string().min(6)
})


userRouter.post("/signup",async(req,res)=>{
    const body = req.body;
    console.log(body);
    
    const {success} = signUp.safeParse(body);


    if(!success){
        return res.status(411).json({
           message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: body.username
    })
    
    if(existingUser){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.create({
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        password: body.password

    })

    const userId = user._id;

    await account.create({
        userId,
        balance: 1 + Math.random() *100000
    })
    const token = jwt.sign({
        userId
    },JWT_TOKEN)

    res.json({
        message: "User created successfully",
	    token: token
    })

})
const signIn = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

userRouter.post("/signin",async(req,res)=>{
    const body = req.body;
    const { success } = signIn.safeParse(body);
    if(!success){
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: body.username,
        password: body.password
    })

    if(user){
        const token = jwt.sign({
            user
        }, JWT_TOKEN)

        res.json({
            token: token
        })
    }else{
        res.status(411).json({
            msg: "user not found"
        })
    }


})

const updates = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string().min(6)
})

userRouter.put("/",authMiddleware, async (req,res)=>{
    const body = req.body;
    const {success} = updates.safeParse(body);
    if(!success){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne({ _id: req.userId }, body);

    res.json({
        message: "Updated successfully"
    })

})

userRouter.get("/bulk", async(req, res) => {
    const filter = req.body.filter || "";
    console.log(filter)
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstname: user.firstName,
            lastname: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = userRouter;