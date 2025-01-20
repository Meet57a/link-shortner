const jwt = require("jsonwebtoken");

exports.tokenGenerate = async (user, expire = "20m") => { 
    return  jwt.sign({ userid: user._id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: expire })
}

exports.verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}