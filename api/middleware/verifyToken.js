const jwt = require('jsonwebtoken')


const verify = (req,res,next)=>{
    const {authorization} = req.headers
   
    if(authorization){
        const token = authorization.split(" ")[1]

        jwt.verify(token,process.env.SECRET_KEY,(err,user)=>{
            if(err) res.status(403).json({ "message":"Token is not valid!" })

            req.user=user
            next()
        })

        
    }else{
        return res.status(401).json({
            "message":"You are not authenticated!"
        })
    }
}

module.exports=verify