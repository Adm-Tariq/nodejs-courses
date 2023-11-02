const jwt = require("jsonwebtoken")
const appError = require("../utils/appError")
const httpStatusText = require

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization']
    if (!authHeader) {
        const error =  appError.create("TOKEN IS REQUIRE", 401, httpStatusText.ERROR)
        return next(error)
    }
    
    const token = authHeader.split(' ')[1]
    try {
        const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY)
        
        req.currentUser = currentUser
        next()
        
    } catch (err) {
        const error =  appError.create("invalid token", 401, httpStatusText.ERROR)
        return next(error)
    }
}

module.exports = verifyToken