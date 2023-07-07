
const jwt = require('jsonwebtoken');



//等於授權的功能，client的token不正確，就不能使用網頁的功能
exports.authenticatedToken = async(req,res,next) => { 
    //console.log(req.headers)

    const authHeader = req.headers.cookie
    console.log('ban')
    console.log(authHeader)
    console.log(req.headers)
    //const token = authHeader && authHeader.split('; ')[4].split('=')[1]
    const token = authHeader && authHeader.split('=')[1]
    console.log(token)
    if(token == null){
        return res.status(403).json("There is no token in client's browser")
    }
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(error) =>{
        if(error){
            return res.status(403).json('token is expired')
        } 
        next()
    })

}


//目前沒用到20230516
exports.generateAccessToken = async(req,res,next,user) => { 
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'1000s'})

}