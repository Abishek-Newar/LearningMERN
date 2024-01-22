const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const { accountRouter } = require("./accout");
router.use("/user",userRouter)
router.use("/account",accountRouter)
module.exports = router;