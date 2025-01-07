import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/User.js";


// user registration
export const register = async (request, response) => {
    try{

        // hashing password 
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(request.body.password, salt);

        const newUser = new User({
            username: request.body.username,
            email: request.body.email,
            password: hash,
            photo: request.body.photo
        });
        await newUser.save();
        response.status(200).json({success: true, message: 'Successfully created'});
    }catch(error){
        response.status(500).json({success: false, message: 'Failed to create. Try again'});
    }
}

// user login
export const login = async (request, response) => {

    const email = request.body.email;

    try{
        const user = await User.findOne({email});
        if(!user){
            return response.status(404).json({success: false, message: 'User not found.'})
        }
    
        const checkCorrectPassword = await bcrypt.compare(request.body.password, user.password)
        if(!checkCorrectPassword){
            return response.status(401).json({success: false, message: 'Incorrect emailr or password'});
        }
    
        const {password, role, ...rest} = user._doc
    
        // create jwt token
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET_KEY, {expiresIn: "15d"});
    
        // set token in the browser cookies and send the response to the client
        response.cookie('accessToken', token, {
            httpOnly: true,
            expires: token.expiresIn,
        }).status(200).json({success: true, message: 'Sucessfully login', token, data:{...rest}, role}) 
    }catch(error){
        return response.status(500).json({success: false, message: 'Failed to login'}); 
    }
}