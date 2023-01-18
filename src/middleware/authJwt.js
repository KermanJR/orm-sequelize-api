const jwt = require('jsonwebtoken');
const config = require('../config/authConfig.js');


verifyToken = (req, res, next)=>{
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(403).json({message: 'Token não foi provido!'})
    }
    
    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).json({message: 'Acesso não autorizado!'})
        }
        req.userId = decoded.id;
        next();
   })
}

module.exports = verifyToken;
