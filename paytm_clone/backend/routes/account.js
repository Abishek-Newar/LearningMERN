const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { account } = require("../db");
const router = express.Router();

router.get("/balance",authMiddleware, async (req,res) =>{
    const userId = req.userId;

    const userAccount = account.find({
        _id:userId
    })
    console.log(userAccount.balance)

    res.json({
        balance: userAccount.balance
    })
})

router.post("/transfer",authMiddleware,async (req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount, to} = req.body;

    const acc = await account.findOne({
        userId: req.userId
    }).session(session)

    if(!acc || acc.balance < amount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toAccount = await account.findOne({
        userId: to
    }).session(session)

    if(!toAccount){
        await session.abortTransaction();
        res.status(400).json({
            message: "Insufficient balance"
        })
    }

    await account.updateOne({userId:req.userId},{"$inc": {balance: -amount}}).session(session)
    await account.updateOne({userId:to},{"$inc":{balance:amount}}).session(session);

    await session.commitSession();
    res.json({
        message: "Transfer successful"
    })


})



module.exports = router;