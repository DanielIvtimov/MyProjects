import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const createReview = async (request, response) => {

    const tourId = request.params.tourId;
    const newReview = new Review({...request.body});

    try{
        const savedReview = await newReview.save();
        await Tour.findByIdAndUpdate(tourId, {
            $push: {reviews: savedReview._id}
        });
        return response.status(200).json({sucess: true, message: "Review submited", data: savedReview });
    }catch(error) {
        return response.status(500).json({success: false, message: "Failed to submit"});    
        
    }
}