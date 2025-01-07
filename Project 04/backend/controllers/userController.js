import User from "../models/User.js"; 

// Create new User
export const createUser = async (request, response) => {
    const newUser = new User(request.body);
    try{
       const savedUser = await newUser.save();
       response.status(200).json({success: true, message: "Successfully created", data: savedUser}); 
    }catch(error){
        response.status(500).json({success: true, message: "Failed to create. Try again"}); 
    }
}

// Update User
export const updateUser = async (request, response) => {
    const id = request.params.id
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {
            $set: request.body
        }, {
            new: true
        });
        response.status(200).json({success: true, message: "Successfully updated", data: updatedUser});
    }catch(error){
        response.status(500).json({success: false, message: "Failed to updated. Try again"}); 
    }
}

// Delete User 
export const deleteUser = async (request, response) => {
    const id = request.params.id
    try{
        await User.findByIdAndDelete(id);
        response.status(200).json({success: true, message: "Successfully deleted."});
    }catch(error){
        response.status(500).json({success: false, message: "Failed to delete."}); 
    }
}

// Get single User 
export const getSingleUser = async (request, response) => {
    const id = request.params.id
    try{
        const User = await User.findById(id);
        response.status(200).json({success: true, message: "Successfully founded.", data: User});
    }catch(error){
        response.status(500).json({success: false, message: "Not found."}); 
    }
}

// Get all User 
export const getAllUser = async (request, response) => {
    try{
        const users = await User.find({});
        response.status(200).json({success: true, message: "Successful.", data: users});
    }catch(error){
        response.status(404).json({success: false, message: "Not found."});
    }
}