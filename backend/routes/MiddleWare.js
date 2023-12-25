const jwt = require('jsonwebtoken')

const middleWare=(request,response,next)=>{
    const authHead=request.headers['authorization']
    let token = null
    if(authHead!==undefined){
        token = authHead.split(' ')[1]
    }
    if(token===undefined){
        response.status(404)
        response.send("Invalid Jwt Token")
    }else{
        jwt.verify(token,'vamsi',async(error,user)=>{
            if(error){
                response.send("Inavalid Jwt Token")
            }else{
                next();
            }
        })
    }
}

module.exports = middleWare