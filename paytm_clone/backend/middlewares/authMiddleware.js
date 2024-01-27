
const jwt = require("jsonwebtoken");

const JWT_TOKEN = require("../config")

function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization;
    const words = authHeader.split(" ");
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
