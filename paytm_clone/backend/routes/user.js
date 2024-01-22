const express = require("express");
const jwt = require("jsonwebtoken");
const {User, account} = require("../db")
const zod = require("zod");
const router = express.Router();
const {JWT_TOKEN} = require("../config");
const { authMiddleware } = require("../middlewares/authMiddleware");

const signUp = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string().email(),
    password: zod.string().min(6)
})


router.post("/signup",async(req,res)=>{
    const body = req.body;
    const {sucess} = signUp.safeParse("body");


    if(!sucess){
        res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        username: body.username
    })
    
    if(existingUser){
        res.status(411).json({
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
    password: zod.string().min(6)
})

router.post("/signin",async(req,res)=>{
    const body = req.body();
    const { sucess } = signIn.safeParse(body);
    if(!sucess){
        res.json({
            message: "Error while logging in"
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

        res.status(200).json({
            message: "logged in",
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

router.put("/",authMiddleware, async (req,res)=>{
    const body = req.body;
    const {sucess} = updates.safeParse(body);
    if(!sucess){
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(body,req.userId);

    res.json({
        message: "Updated successfully"
    })

})

router.get("/bulk", async (req,res)=>{
    const filter = req.body.filter || "";

    const user = await User.find({
        "$or": [{
            firstName: {
                "regex" : filter
            },
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        users : user.map(user =>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName
        }))
    })
} )


module.exports = {router};