import jwt from "jsonwebtoken";

 export const veryfiToken = (request, response, next) => {
    const token = request.cookies.accessToken
    if(!token){
        return response.status(401).json({success: false, message: "You're not authorize"});
    }

    // if token is exist then verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
        if(error){
            return response.status(401).json({success: false, message: "token is invalid" })
        }
        request.user = user;
        next(); // important to call next 
    })
}

export const verifyUser = (request, response, next) => {
    veryfiToken(request, response, next, () => {
        if(request.user.id === request.params.id || request.user.role === 'admin'){
            next(); 
        }
        else{
            return response.status(401).json({success: false, message: "You're not authenticated."});
        }
    })
}

export const verifyAdmin = (request, response, next) => {
    veryfiToken(request, response, next, () => {
        if(request.user.role === 'admin'){
            next();
        }
        else{
           return response.status(401).json({success: false, message: "You're not authorize."});
        }
    })
} 

