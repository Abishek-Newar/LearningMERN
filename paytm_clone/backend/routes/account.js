const express = require("express");
const { account } = require("../db");
const accountRouter = express.Router();

accountRouter.get("/balance", async (req,res) =>{
    const userId = req.userId;

    const acc = account.find({
        userId
    })

    res.json({
        balance: acc.balance
    })
})

accountRouter.P

module.exports = {accountRouter};