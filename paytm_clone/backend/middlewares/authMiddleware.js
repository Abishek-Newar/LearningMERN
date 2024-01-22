
const jwt = require("jsonwebtoken");

const {JWT_TOKEN} = require("../config")

const authMiddleware = (res,req,next)=>{
    const header = req.headers.authorization;
    const words = header.split(" ");
    const token = words[1];
    const decoded = jwt.verify(token,JWT_TOKEN)
    try{
        if(decoded.userId){
            req.userId = decoded.userId
            next();
        }
        else{
            res.status(403).json({})
        }
    }
    catch(e){
        res.status(403).json({})
    }
    

}


module.exports = {
    authMiddleware
}
