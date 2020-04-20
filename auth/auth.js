const jwt = require('jsonwebtoken')

const auth = async (req,res,next) => {
    var token = req.headers['auth'];
    if(token){
        req.user = await jwt.verify(token,process.env.SECRET).id;
        next()
    } else {
        return res.json({
            message:"You are not logged in"
        })
    }
}

module.exports = auth;