const express = require("express");
const app = express();
const router = require("./routes/index")
const cors = require("cors")
const jwt = require("jsonwebtoken")
app.use(cors());
app.use(express.json())
app.use("/api/v1", router);



app.listen(3000);
