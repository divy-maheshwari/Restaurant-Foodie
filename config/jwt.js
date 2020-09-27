const jwt = require('jsonwebtoken')
const secret = require('./keys').JWT_SECRET;



const getToken = (user) => {
        return jwt.sign({_id:user._id,
                         name:user.name,
                         email:user.email,
                         isAdmin:user.isAdmin      
        },secret,{expiresIn: '24h'}
        )}

const isAuth = (req,res,next) => {
        const token = req.headers.authorization;
        if(token) {
                const onlyToken = token.slice(7,token.length);
                jwt.verify(onlyToken,secret,(err,decode) => {
                        if(err) {
                                return res.status(401).json({msg:'Invalid token'})
                        }
                        req.user = decode;
                        next();
                        return;
                });
        }
        else {
                return res.status(401).json({msg:'token not supplied'});
        }

}

module.exports = {
        getToken,
        isAuth
}