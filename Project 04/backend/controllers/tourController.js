import Tour from "../models/Tour.js"; 

// Create new tour
export const createTour = async (request, response) => {
    const newTour = new Tour(request.body);
    try{
       const savedTour = await newTour.save();
       response.status(200).json({success: true, message: "Successfully created", data: savedTour}); 
    }catch(error){
        response.status(500).json({success: true, message: "Failed to create. Try again"}); 
    }
}

// Update tour
export const updateTour = async (request,response) => {
    const id = request.params.id
    try{
        const updatedTour = await Tour.findByIdAndUpdate(id, {
            $set: request.body
        }, {
            new: true
        });
        response.status(200).json({success: true, message: "Successfully updated", data: updatedTour});
    }catch(error){
        response.status(500).json({success: false, message: "Failed to updated. Try again"}); 
    }
}

// Delete tour 
export const deleteTour = async (request,response) => {
    const id = request.params.id
    try{
        await Tour.findByIdAndDelete(id);
        response.status(200).json({success: true, message: "Successfully deleted."});
    }catch(error){
        response.status(500).json({success: false, message: "Failed to delete."}); 
    }
}

// Get single tour 
export const getSingleTour = async (request,response) => {
    const id = request.params.id
    try{
        const tour = await Tour.findById(id).populate('reviews');
        response.status(200).json({success: true, message: "Successfully founded.", data: tour});
    }catch(error){
        response.status(500).json({success: false, message: "Not found."}); 
    }
}

// Get all tour 
export const getAllTour = async (request,response) => {
    // pagination
    const page = parseInt(request.query.page);

    try{
        const tours = await Tour.find({}).populate('reviews').skip(page * 8).limit(8)
        response.status(200).json({success: true, count:tours.length, message: "Successful.", data: tours});
    }catch(error){
        response.status(404).json({success: false, message: "Not found."});
    }
}


// Get tour by search 
export const getToursBySearch = async (request,response) => {

    const city = new RegExp(request.query.city, 'i');
    const distance = parseInt(request.query.distance);
    const maxGroupSize = parseInt(request.query.maxGroupSize);  

     try{
        // gte means greater than equal 
        const tour = await Tour.find({city, distance:{$gte: distance}, maxGroupSize:{$gte: maxGroupSize}}).populate('reviews');
        response.status(200).json({success: true, message: "Successful.", data: tour});
     }catch(error){
        response.status(404).json({success: false, message: "Not found."});
     }
}


// Get featured tour
export const getFeaturedTour = async (request,response) => {
    try{
        const tours = await Tour.find({featured: true}).populate('reviews').limit(8);
        response.status(200).json({success: true, count:tours.length, message: "Successful.", data: tours});
    }catch(error){
        response.status(404).json({success: false, message: "Not found."});
    }
}

// Get tour counts 
export const getTourCount = async (request,response) => {
    try{
       const tourCount = await Tour.estimatedDocumentCount();
       response.status(200).json({success: true, data: tourCount}); 
    }catch(error){
        response.status(500).json({success: false, message: "Failed to fetch"});   
    }
}